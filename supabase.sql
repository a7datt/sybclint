-- ============================================
-- Database Schema - Secured Version
-- ✅ RLS مُفعَّل على جميع الجداول
-- ✅ تم حذف كلمة المرور الافتراضية للأدمن
-- ✅ تمت إضافة جدول audit_logs
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: admins
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ✅ لا يوجد INSERT بكلمة مرور افتراضية هنا.
-- أنشئ حساب الأدمن يدوياً بتشغيل:
--
--   node scripts/create-admin.js
--
-- أو عبر script آمن منفصل بعد نشر التطبيق.

-- Table: subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active',
  max_wallets INTEGER DEFAULT 1,
  current_balance DECIMAL(10, 2) DEFAULT 0.00,
  auto_renew BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: api_keys
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  key_prefix VARCHAR(50) NOT NULL,
  key_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used_at TIMESTAMP WITH TIME ZONE
);

-- Table: system_settings
CREATE TABLE IF NOT EXISTS system_settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO system_settings (key, value) VALUES
('deposit_wallet_id', NULL),
('deposit_wallet_address', NULL),
('syp_to_usd_rate', '15000')
ON CONFLICT DO NOTHING;

-- Table: admin_wallets
CREATE TABLE IF NOT EXISTS admin_wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address VARCHAR(255),
  account_number VARCHAR(255),
  name VARCHAR(255) DEFAULT 'Deposit Wallet',
  status VARCHAR(50) DEFAULT 'pending',
  -- ✅ session_data مشفرة من الـ backend قبل التخزين
  session_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: wallets
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wallet_address VARCHAR(255),
  account_number VARCHAR(255),
  name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  -- ✅ session_data مشفرة من الـ backend قبل التخزين
  session_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: deposit_requests
CREATE TABLE IF NOT EXISTS deposit_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_usd DECIMAL(10,2),
  tx_id VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(50) DEFAULT 'pending',
  verification_method VARCHAR(50) DEFAULT 'auto',
  admin_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- ✅ جدول جديد: Audit Logs لتتبع جميع العمليات الحساسة
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_deposit_requests_user_id ON deposit_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_deposit_requests_status ON deposit_requests(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

ALTER TABLE wallets ALTER COLUMN wallet_address DROP NOT NULL;
ALTER TABLE wallets ALTER COLUMN account_number DROP NOT NULL;

-- ============================================
-- ✅ تفعيل Row Level Security (RLS)
-- ============================================
-- الـ backend يستخدم Service Role Key الذي يتجاوز RLS بشكل آمن.
-- RLS يحمي من الوصول المباشر لقاعدة البيانات في حال حدوث أي خلل.

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_wallets ENABLE ROW LEVEL SECURITY;

-- ✅ سياسات RLS: الـ Service Role يتجاوز RLS تلقائياً، 
-- هذه السياسات تمنع الوصول المباشر من أي جهة أخرى.
-- لا أحد يستطيع القراءة أو الكتابة مباشرة إلا عبر الـ backend.

CREATE POLICY "backend_only_users" ON users
  USING (false);

CREATE POLICY "backend_only_admins" ON admins
  USING (false);

CREATE POLICY "backend_only_subscriptions" ON subscriptions
  USING (false);

CREATE POLICY "backend_only_api_keys" ON api_keys
  USING (false);

CREATE POLICY "backend_only_wallets" ON wallets
  USING (false);

CREATE POLICY "backend_only_deposit_requests" ON deposit_requests
  USING (false);

CREATE POLICY "backend_only_audit_logs" ON audit_logs
  USING (false);

CREATE POLICY "backend_only_system_settings" ON system_settings
  USING (false);

CREATE POLICY "backend_only_admin_wallets" ON admin_wallets
  USING (false);
