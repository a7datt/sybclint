import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './src/server/routes/auth.js';
import googleAuthRoutes from './src/server/routes/google_auth.js';
import dashboardRoutes from './src/server/routes/dashboard.js';
import externalApiRoutes from './src/server/routes/external_api.js';
import invoiceRoutes from './src/server/routes/invoices.js';
import { setupCronJobs } from './src/server/cron.js';
import { globalApiRateLimiter } from './src/server/middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredEnvVars = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'SUPABASE_SERVICE_ROLE_KEY',
  'VITE_SUPABASE_URL',
  'SESSION_ENCRYPTION_KEY',
  'PROXY_API_KEY',
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ FATAL: Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Optional Google OAuth
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('⚠️  GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set — Google login disabled');
}

async function startServer() {
  setupCronJobs();

  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: process.env.NODE_ENV === 'production'
          ? ["'self'", "https://fonts.googleapis.com"]
          : ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        styleSrcElem: process.env.NODE_ENV === 'production'
          ? ["'self'", "https://fonts.googleapis.com"]
          : ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https://i.ibb.co", "https://lh3.googleusercontent.com"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  }));

  app.use('/api', (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin && process.env.NODE_ENV !== 'production') return callback(null, true);
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type', 'X-API-Key'],
    credentials: true,
  }));

  app.use(express.json({ limit: '10kb' }));
  app.use(cookieParser());

  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
      }
      next();
    });
  }

  app.use('/api', globalApiRateLimiter);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // API Routes — Client only (no admin routes)
  app.use('/api/auth', authRoutes);
  app.use('/api/auth/google', googleAuthRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/v1', externalApiRoutes);
  app.use('/api/v1/invoices', invoiceRoutes);

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[Global Error]', err.message || err);
    res.status(err.status || 500).json({ error: 'Internal server error' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, '.');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Client server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
