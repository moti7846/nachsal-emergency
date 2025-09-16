import { fetchPendingJobs, markJobSent, markJobFailed, markJobDisabled } from '../DAL/pushJobsDAL.js';
import { getSubscriptionById } from '../DAL/pushSubDAL.js';
import { sendWebPush, calcRetryDelayMs } from '../services/pushService.js';

function classifyFailure(status) {
  // 404/410: endpoint no longer valid -> disable
  if (status === 404 || status === 410) return 'disable';
  // 5xx or network: retryable
  if (status >= 500) return 'retry';
  // 4xx other than 404/410: treat as non-retryable failure
  return 'fail';
}

async function processJob(job) {
  // Minimal fields used: id, subscription_id, attempt (optional), alert_id (for logs/metrics)
  const subId = job.subscription_id;
  const sub = subId ? await getSubscriptionById(subId) : null;

  // If subscription missing or disabled, mark disabled and exit
  if (!sub || sub.is_disabled) {
    await markJobDisabled(job.id, 'Subscription missing/disabled');
    return { id: job.id, result: 'disabled' };
  }

  const res = await sendWebPush(job, sub);

  if (res.ok) {
    await markJobSent(job.id);
    return { id: job.id, result: 'sent', dry: !!res.dryRun };
  }

  const kind = classifyFailure(res.status ?? 0);

  if (kind === 'disable') {
    await markJobDisabled(job.id, res.reason || 'Gone/Not Found');
    return { id: job.id, result: 'disabled' };
  }

  if (kind === 'retry') {
    const nextDelayMs = calcRetryDelayMs((job.attempt ?? 0) + 1);
    // We assume markJobFailed can store next retry (e.g., next_attempt_at) internally.
    // If your DAL requires the delay, pass it via reason/meta:
    await markJobFailed(job.id, `Retry scheduled in ~${Math.round(nextDelayMs / 1000)}s`);
    return { id: job.id, result: 'failed-retry' };
  }

  await markJobFailed(job.id, res.reason || 'Non-retryable error');
  return { id: job.id, result: 'failed' };
}

export async function runOnce() {
  const dry = process.env.DRY_RUN === '1' || process.env.DRY === '1';

  // fetchPendingJobs: assumed to return an array of jobs (id, subscription_id, payload, attempt, alert_id, etc.)
  const jobs = await fetchPendingJobs();
  if (!jobs || jobs.length === 0) {
    console.log(`[pushWorker] No pending jobs. DRY=${dry ? '1' : '0'}`);
    return { total: 0, sent: 0, failed: 0, disabled: 0 };
  }

  console.log(`[pushWorker] Processing ${jobs.length} job(s). DRY=${dry ? '1' : '0'}`);

  const results = { total: jobs.length, sent: 0, failed: 0, disabled: 0, failedRetry: 0 };

  for (const job of jobs) {
    try {
      const r = await processJob(job);
      if (r.result === 'sent') results.sent += 1;
      else if (r.result === 'disabled') results.disabled += 1;
      else if (r.result === 'failed-retry') results.failedRetry += 1;
      else results.failed += 1;
    } catch (e) {
      // If something unexpected happened, mark as failed (non-retry) to avoid infinite loops
      console.error(`[pushWorker] Unexpected error on job ${job.id}:`, e?.message || e);
      try { await markJobFailed(job.id, 'Worker exception'); } catch {}
      results.failed += 1;
    }
  }

  console.log(`[pushWorker] Done. Sent=${results.sent}, Disabled=${results.disabled}, Failed=${results.failed}, Failed(Retry)=${results.failedRetry}`);
  return results;
}

// Allow running as a script: `node jobs/pushWorker.js`
// This guard is Windows-safe (normalizes backslashes).
try {
  const invoked = process.argv[1];
  const asFileUrl = (p) => {
    // Normalize Windows path to file:// URL for a stable compare
    const norm = p.replace(/\\/g, '/');
    return new URL('file://' + norm).href;
  };
  if (invoked && new URL(import.meta.url).href === asFileUrl(invoked)) {
    runOnce()
      .then(() => process.exit(0))
      .catch((err) => {
        console.error('[pushWorker] Fatal error:', err?.message || err);
        process.exit(1);
      });
  }
} catch (e) {
  console.error('[pushWorker] Launcher guard error:', e?.message || e);
  process.exit(1);
}

