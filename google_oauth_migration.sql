-- ============================================================
-- Google OAuth Migration
-- ============================================================

-- إضافة حقول Google OAuth لجدول users
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- فهرس على google_id للبحث السريع
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id) WHERE google_id IS NOT NULL;

-- السماح بكلمة مرور فارغة لحسابات Google (password_hash اختياري الآن)
-- ملاحظة: إذا كان عمود password_hash يحتوي NOT NULL بدون قيمة افتراضية
-- غيّره كالتالي:
ALTER TABLE users
  ALTER COLUMN password_hash SET DEFAULT '';
