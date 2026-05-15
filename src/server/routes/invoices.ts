import express from 'express';
import { supabase } from '../db.js';
import { authenticateApiKey, logAuditEvent } from '../middleware.js';
import { z } from 'zod';
import crypto from 'crypto';

const router = express.Router();

router.use(authenticateApiKey);

// ─── Validation Schemas ───────────────────────
const createInvoiceSchema = z.object({
  walletAddress: z.string().min(1).max(255).trim(),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'المبلغ يجب أن يكون رقماً موجباً'),
  currency: z.enum(['SYP', 'USD', 'EUR']),
  webhookUrl: z.string().url('رابط Webhook غير صالح').optional(),
  expiresInMinutes: z.number().int().min(5).max(1440).default(30),
  note: z.string().max(500).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ─── Webhook helper ───────────────────────────
async function sendWebhook(webhookUrl: string, payload: object, invoiceId: string) {
  try {
    const body = JSON.stringify(payload);
    const secret = process.env.WEBHOOK_SECRET || '';
    const signature = secret
      ? crypto.createHmac('sha256', secret).update(body).digest('hex')
      : undefined;

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (signature) headers['X-Webhook-Signature'] = `sha256=${signature}`;

    const response = await fetch(webhookUrl, { method: 'POST', headers, body });

    await supabase.from('invoice_webhook_logs').insert({
      invoice_id: invoiceId,
      url: webhookUrl,
      status_code: response.status,
      success: response.ok,
      sent_at: new Date().toISOString(),
    });

    return response.ok;
  } catch (err) {
    console.error('[Webhook Error]', (err as Error).message);
    await supabase.from('invoice_webhook_logs').insert({
      invoice_id: invoiceId,
      url: webhookUrl,
      status_code: null,
      success: false,
      error_message: (err as Error).message,
      sent_at: new Date().toISOString(),
    });
    return false;
  }
}

// ─── 1. Create Invoice ────────────────────────
// POST /v1/invoices
router.post('/', async (req, res) => {
  try {
    const userId = req.apiKeyUser!.id;

    const parseResult = createInvoiceSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: parseResult.error.errors[0].message,
      });
    }

    const { walletAddress, amount, currency, webhookUrl, expiresInMinutes, note, metadata } =
      parseResult.data;

    // Verify wallet belongs to this user
    let walletQuery = supabase
      .from('wallets')
      .select('id, wallet_address, account_number, status')
      .eq('user_id', userId);

    if (uuidRegex.test(walletAddress)) {
      walletQuery = walletQuery.eq('id', walletAddress);
    } else if (/^[0-9a-f]{32}$/i.test(walletAddress)) {
      walletQuery = walletQuery.eq('wallet_address', walletAddress);
    } else {
      walletQuery = walletQuery.eq('account_number', walletAddress);
    }

    const { data: wallet } = await walletQuery.maybeSingle();
    if (!wallet) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'المحفظة غير موجودة' });
    }
    if (wallet.status !== 'active') {
      return res.status(401).json({ error: 'WALLET_INACTIVE', message: 'المحفظة غير نشطة' });
    }

    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000).toISOString();
    const invoiceId = crypto.randomUUID();

    const { data: invoice, error } = await supabase
      .from('invoices')
      .insert({
        id: invoiceId,
        user_id: userId,
        wallet_id: wallet.id,
        identifier: wallet.wallet_address || wallet.account_number,
        amount,
        currency,
        status: 'pending',
        webhook_url: webhookUrl || null,
        note: note || null,
        metadata: metadata || null,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) throw error;

    await logAuditEvent(userId, 'INVOICE_CREATED', { invoiceId, amount, currency });

    res.status(201).json({
      invoiceId: invoice.id,
      status: 'pending',
      method: 'shamcash',
      identifier: invoice.identifier,
      amount: invoice.amount,
      currency: invoice.currency,
      expiresAt: invoice.expires_at,
      createdAt: invoice.created_at,
    });
  } catch (error) {
    console.error('[Invoice Create Error]', (error as Error).message);
    res.status(500).json({ error: 'INTERNAL_ERROR', message: 'خطأ داخلي في الخادم' });
  }
});

// ─── 2. Get Invoice ───────────────────────────
// GET /v1/invoices/:invoiceId
router.get('/:invoiceId', async (req, res) => {
  try {
    const userId = req.apiKeyUser!.id;
    const { invoiceId } = req.params;

    if (!uuidRegex.test(invoiceId)) {
      return res.status(400).json({ error: 'INVALID_ID', message: 'معرّف الفاتورة غير صالح' });
    }

    const { data: invoice, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .eq('user_id', userId)
      .single();

    if (error || !invoice) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'الفاتورة غير موجودة' });
    }

    res.json(formatInvoice(invoice));
  } catch (error) {
    console.error('[Invoice Get Error]', (error as Error).message);
    res.status(500).json({ error: 'INTERNAL_ERROR', message: 'خطأ داخلي في الخادم' });
  }
});

// ─── 3. List Invoices ─────────────────────────
// GET /v1/invoices
router.get('/', async (req, res) => {
  try {
    const userId = req.apiKeyUser!.id;

    const statusOptions = ['pending', 'paid', 'expired', 'cancelled'] as const;
    const statusParam = req.query.status as string | undefined;
    const statusFilter = statusParam && statusOptions.includes(statusParam as any)
      ? statusParam
      : undefined;

    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.min(100, Math.max(1, Number(req.query.limit || 20)));
    const offset = (page - 1) * limit;

    let query = supabase
      .from('invoices')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (statusFilter) query = query.eq('status', statusFilter);

    const { data: invoices, error, count } = await query;

    if (error) throw error;

    res.json({
      data: (invoices || []).map(formatInvoice),
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('[Invoice List Error]', (error as Error).message);
    res.status(500).json({ error: 'INTERNAL_ERROR', message: 'خطأ داخلي في الخادم' });
  }
});

// ─── 4. Cancel Invoice ────────────────────────
// DELETE /v1/invoices/:invoiceId
router.delete('/:invoiceId', async (req, res) => {
  try {
    const userId = req.apiKeyUser!.id;
    const { invoiceId } = req.params;

    if (!uuidRegex.test(invoiceId)) {
      return res.status(400).json({ error: 'INVALID_ID', message: 'معرّف الفاتورة غير صالح' });
    }

    const { data: invoice } = await supabase
      .from('invoices')
      .select('id, status')
      .eq('id', invoiceId)
      .eq('user_id', userId)
      .single();

    if (!invoice) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'الفاتورة غير موجودة' });
    }

    if (invoice.status !== 'pending') {
      return res.status(409).json({
        error: 'INVALID_STATUS',
        message: `لا يمكن إلغاء فاتورة بحالة: ${invoice.status}`,
      });
    }

    await supabase
      .from('invoices')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', invoiceId)
      .eq('user_id', userId);

    await logAuditEvent(userId, 'INVOICE_CANCELLED', { invoiceId });

    res.json({ success: true, message: 'تم إلغاء الفاتورة بنجاح' });
  } catch (error) {
    console.error('[Invoice Cancel Error]', (error as Error).message);
    res.status(500).json({ error: 'INTERNAL_ERROR', message: 'خطأ داخلي في الخادم' });
  }
});

// ─── 5. Webhook callback (internal/server use) ──
// POST /v1/invoices/:invoiceId/paid  (called by internal cron / event system)
router.post('/:invoiceId/paid', async (req, res) => {
  try {
    const { invoiceId } = req.params;

    if (!uuidRegex.test(invoiceId)) {
      return res.status(400).json({ error: 'INVALID_ID' });
    }

    const {
      transactionRef,
      paidAmount,
      counterparty,
      paidAt,
    } = req.body;

    const { data: invoice } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (!invoice) return res.status(404).json({ error: 'NOT_FOUND' });
    if (invoice.status !== 'pending') {
      return res.status(409).json({ error: 'ALREADY_PROCESSED' });
    }

    await supabase
      .from('invoices')
      .update({
        status: 'paid',
        transaction_ref: transactionRef || null,
        paid_amount: paidAmount || null,
        counterparty: counterparty || null,
        paid_at: paidAt || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', invoiceId);

    if (invoice.webhook_url) {
      await sendWebhook(
        invoice.webhook_url,
        {
          event: 'invoice.paid',
          invoiceId: invoice.id,
          method: 'shamcash',
          identifier: invoice.identifier,
          amount: invoice.amount,
          currency: invoice.currency,
          transactionRef: transactionRef || null,
          paidAmount: paidAmount || null,
          counterparty: counterparty || null,
          paidAt: paidAt || new Date().toISOString(),
        },
        invoiceId
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('[Invoice Paid Error]', (error as Error).message);
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
});

// ─── Helper ───────────────────────────────────
function formatInvoice(inv: any) {
  return {
    invoiceId: inv.id,
    status: inv.status,
    method: 'shamcash',
    identifier: inv.identifier,
    amount: inv.amount,
    currency: inv.currency,
    note: inv.note || null,
    metadata: inv.metadata || null,
    webhookUrl: inv.webhook_url || null,
    transactionRef: inv.transaction_ref || null,
    paidAmount: inv.paid_amount || null,
    counterparty: inv.counterparty || null,
    paidAt: inv.paid_at || null,
    expiresAt: inv.expires_at,
    createdAt: inv.created_at,
    updatedAt: inv.updated_at,
  };
}

export default router;
