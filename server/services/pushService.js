import webpush from 'web-push';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@example.com';

try {
  // Configure only if keys exist; otherwise real send will return 500 later.
  if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  }
} catch (e) {
  // Do not throw on import; allow the rest of the system to run.
  console.error('[pushService] VAPID configuration error:', e?.message || e);
}

export function calcRetryDelayMs(attempt) {
  const base = Math.pow(2, Math.max(1, Number(attempt) || 1)) * 1000; // 2s,4s,8s,...
  const cap = 15 * 60 * 1000; // 15 minutes
  const jitter = 0.2 + Math.random() * 0.6; // 0.2..0.8 multiplier
  return Math.min(base * jitter, cap);
}

function buildPayload(job) {
  let base;
  if (job && typeof job.payload === 'object' && job.payload !== null) {
    base = job.payload;
  } else if (typeof job?.payload === 'string') {
    try {
      base = JSON.parse(job.payload);
    } catch {
      // treat as plain text body
      base = { title: 'Alert', body: String(job.payload), url: 'https://example.com' };
    }
  } else {
    base = { title: 'Alert', body: 'Open the app to see details', url: 'https://example.com' };
  }

  const enriched = {
    ...base,
    alertId: job?.alert_id ?? job?.alertId ?? undefined,
    jobId: job?.id ?? undefined,
  };

  return JSON.stringify(enriched);
}

function normalizeSubscription(subscription) {
  const endpoint = subscription?.endpoint || null;

  // Try common fields first
  let keysRaw =
    subscription?.keys ??
    subscription?.keys_json ??
    subscription?.keysObj ??
    null;

  // Fallback: split columns scenario
  if (!keysRaw && (subscription?.p256dh || subscription?.auth)) {
    keysRaw = { p256dh: subscription?.p256dh, auth: subscription?.auth };
  }

  // Parse stringified JSON if needed
  if (typeof keysRaw === 'string') {
    try { keysRaw = JSON.parse(keysRaw); } catch { /* ignore parse error */ }
  }

  const keys = (keysRaw && typeof keysRaw === 'object') ? keysRaw : null;
  const p256dh = keys?.p256dh || null;
  const auth = keys?.auth || null;

  return { endpoint, p256dh, auth };
}

function mapSendError(err) {
  const status =
    err?.statusCode ??
    err?.status ??
    err?.response?.statusCode ??
    err?.response?.status ??
    0;

  let reason =
    err?.body ??
    err?.message ??
    err?.statusMessage ??
    (typeof err === 'string' ? err : undefined) ??
    'Unknown error';

  if (typeof reason === 'string' && reason.length > 500) {
    reason = reason.slice(0, 500) + '...';
  }
  return { ok: false, status, reason };
}

export async function sendWebPush(job, subscription) {
  const dry = process.env.DRY_RUN === '1' || process.env.DRY === '1';

  // Guard rails
  if (!subscription || subscription.is_disabled) {
    return { ok: false, status: 410, reason: 'Subscription missing/disabled' };
  }

  // Normalize/validate subscription
  const { endpoint, p256dh, auth } = normalizeSubscription(subscription);
  if (!endpoint || !p256dh || !auth) {
    return { ok: false, status: 400, reason: 'Invalid subscription keys/endpoint' };
  }

  // DRY mode (Stage 7a behavior)
  if (dry) {
    return { ok: true, dryRun: true };
  }

  // Real push requires VAPID keys
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return { ok: false, status: 500, reason: 'VAPID keys not configured' };
  }

  const payload = buildPayload(job);

  // Browser-compatible subscription object
  const pushSub = { endpoint, keys: { p256dh, auth } };

  // Delivery parameters
  const options = {
    TTL: 60,           // seconds to retain if device is offline
    urgency: 'high',   // 'very-low' | 'low' | 'normal' | 'high'
  };

  try {
    await webpush.sendNotification(pushSub, payload, options);
    return { ok: true };
  } catch (err) {
    return mapSendError(err);
  }
}
