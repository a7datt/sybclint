-- ============================================================
-- OTP Hash Migration
-- [CRIT-1 FIX] OTP codes are now stored as HMAC-SHA256 hashes
-- rather than plaintext values.
--
-- IMPORTANT: After deploying this migration, any existing unused
-- OTP codes in the table will become invalid because they are stored
-- as plaintext but the application will now look them up by hash.
-- This is acceptable — users will simply need to request a new OTP.
--
-- The 'code' column already exists; no schema change is needed
-- since HMAC-SHA256 output is a 64-character hex string which fits
-- in a TEXT column.
-- ============================================================

-- Invalidate all existing unused OTPs to force re-issue.
-- This prevents a DB-breach attacker from using any pre-existing codes.
UPDATE otp_codes SET used = true WHERE used = false;

-- Optional index improvement: if not already present, add an index
-- on (email, type, used) to speed up hash lookups.
CREATE INDEX IF NOT EXISTS idx_otp_codes_lookup
  ON otp_codes (email, code, type, used)
  WHERE used = false;
