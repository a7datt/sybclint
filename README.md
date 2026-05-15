# مشروع العملاء (Client App)

واجهة المستخدمين + السيرفر الخاص بالعملاء.

## الملفات المهمة

| الملف | الوصف |
|-------|-------|
| `server.ts` | السيرفر — يشمل routes: auth, dashboard, external_api, google_auth |
| `src/App.tsx` | الراوتر الأمامي — بدون صفحة /admin |
| `.env.example` | نسخه إلى `.env` وأضف قيمك |

## إعداد المشروع

### 1. تثبيت الحزم
```bash
npm install
```

### 2. إعداد متغيرات البيئة
```bash
cp .env.example .env
# عدّل .env وأضف قيمك الحقيقية
```

### المتغيرات المطلوبة
| المتغير | الوصف |
|---------|-------|
| `VITE_SUPABASE_URL` | رابط مشروع Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | مفتاح Supabase الخاص |
| `JWT_SECRET` | سر JWT للمستخدمين (64+ حرف) |
| `JWT_REFRESH_SECRET` | سر Refresh Token (64+ حرف) |
| `SESSION_ENCRYPTION_KEY` | مفتاح تشفير الجلسات (64 hex) |
| `PROXY_ENCRYPTION_KEY` | مفتاح تشفير البروكسي (64 hex) |
| `PROXY_HMAC_SECRET` | سر HMAC للبروكسي (64 hex) |
| `PROXY_API_KEY` | مفتاح API للبروكسي |
| `ALLOWED_ORIGINS` | النطاقات المسموحة لـ CORS |
| `VITE_DEPOSIT_ADDRESS` | عنوان محفظة الإيداع |

### المتغيرات الاختيارية
| المتغير | الوصف |
|---------|-------|
| `RESEND_API_KEY` | مفتاح Resend لإرسال OTP |
| `FROM_EMAIL` | البريد المرسل منه |
| `GOOGLE_CLIENT_ID` | معرّف Google OAuth |
| `GOOGLE_CLIENT_SECRET` | سر Google OAuth |

### 3. تشغيل SQL في Supabase (مرة واحدة)
```sql
-- بالترتيب:
-- 1. supabase.sql
-- 2. otp_migrations.sql
-- 3. google_oauth_migration.sql
-- 4. security_migrations.sql
-- 5. otp_hash_migration.sql
```

### 4. تطوير محلي
```bash
npm run dev
# يعمل على http://localhost:3000
```

### 5. بناء للإنتاج
```bash
npm run build
npm start
```

## هيكل المشروع

```
client-project/
├── server.ts              # السيرفر (Express)
├── src/
│   ├── App.tsx            # الراوتر
│   ├── main.tsx
│   ├── pages/             # صفحات العملاء
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── Wallets.tsx
│   │   ├── WalletDetails.tsx
│   │   ├── Deposit.tsx
│   │   ├── Subscription.tsx
│   │   ├── ApiKeys.tsx
│   │   └── Docs.tsx
│   └── server/
│       ├── routes/
│       │   ├── auth.ts
│       │   ├── dashboard.ts
│       │   ├── external_api.ts
│       │   └── google_auth.ts
│       ├── middleware.ts
│       ├── cron.ts
│       ├── db.ts
│       └── otp.ts
```
