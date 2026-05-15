-- ============================================================
-- Security Migrations - تطبيق مع الكود الجديد
-- ============================================================

-- [C-2 FIX] جدول Refresh Tokens لدعم Token Revocation
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked BOOLEAN NOT NULL DEFAULT false,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_revoked ON refresh_tokens(revoked) WHERE revoked = false;

-- تنظيف تلقائي للتوكنات المنتهية يومياً
CREATE OR REPLACE FUNCTION cleanup_expired_refresh_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM refresh_tokens WHERE expires_at < now() - interval '1 day';
END;
$$ LANGUAGE plpgsql;

-- [M-6 FIX] إضافة حقول Account Lockout لجدول users
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ;

-- [M-6 FIX] دالة RPC لزيادة عداد المحاولات الفاشلة مع Lockout تلقائي بعد 5 محاولات
CREATE OR REPLACE FUNCTION increment_failed_login(user_id UUID)
RETURNS void AS $$
DECLARE
  current_attempts INTEGER;
BEGIN
  UPDATE users
  SET failed_login_attempts = failed_login_attempts + 1
  WHERE id = user_id
  RETURNING failed_login_attempts INTO current_attempts;

  -- قفل الحساب لمدة 15 دقيقة بعد 5 محاولات فاشلة
  IF current_attempts >= 5 THEN
    UPDATE users
    SET locked_until = now() + interval '15 minutes'
    WHERE id = user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- [C-3 FIX] دالة RPC atomic لإضافة رصيد المستخدم بدون Race Condition
-- هذه الدالة تضمن أن عمليتين لا تتم بالتزامن على نفس الرصيد
CREATE OR REPLACE FUNCTION add_user_balance(p_user_id UUID, p_amount NUMERIC)
RETURNS void AS $$
BEGIN
  UPDATE subscriptions
  SET current_balance = current_balance + p_amount
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Subscription not found for user %', p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Row Level Security (RLS) - تأكد من تفعيله على جميع الجداول
ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;

-- سياسة: المستخدم يرى فقط توكناته الخاصة
CREATE POLICY "Users can only access own refresh tokens"
  ON refresh_tokens FOR ALL
  USING (auth.uid() = user_id);

-- ملاحظة: تأكد من تفعيل RLS على:
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE deposit_requests ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
