-- ============================================================
-- OTP Migrations - جدول رموز التحقق OTP
-- ============================================================

-- جدول رموز OTP
CREATE TABLE IF NOT EXISTS otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('register', 'login')),
  used BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_otp_codes_email ON otp_codes(email);
CREATE INDEX IF NOT EXISTS idx_otp_codes_email_type ON otp_codes(email, type, used);

-- تنظيف تلقائي لرموز OTP المنتهية
CREATE OR REPLACE FUNCTION cleanup_expired_otp_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_codes WHERE expires_at < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql;

-- إضافة حقل email_verified لجدول users (إذا لم يكن موجوداً)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT false;

-- تفعيل RLS على جدول otp_codes
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;
