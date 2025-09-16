// scripts/alertsJobsSmoke.mjs
// Smoke test for alerts + push_jobs DAL

import path from "path";
import { fileURLToPath } from "url";
import { config as loadEnv } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.resolve(__dirname, "../.env") });

import supabase from "../db/connect.js";

import { createAlert, getAlertById } from "../DAL/alertsDAL.js";
import {
  createJobsBatch,
  fetchPendingJobs,
  markJobSent,
  markJobFailed,
  markJobDisabled,
  getAlertMetrics,
} from "../DAL/pushJobsDAL.js";
import { getActiveSubscriptions } from "../DAL/pushSubDAL.js";

function assert(cond, msg) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function run() {
  console.log("=== 0) sanity: subscriptions present? ===");
  const subs = await getActiveSubscriptions();
  console.log("active subs:", subs.length);
  if (subs.length === 0) {
    console.log("No active subscriptions -> enqueue will be 0. You can create one via /push/subscribe.");
  }

  console.log("\n=== 1) create alert ===");
  const { alertId, alert } = await createAlert({
    title: 'נפעל נכס"ל',
    body: "היכנס לעדכון מיקום וסטטוס",
    url: "https://your.site/status-update",
    createdBy: null, // or a real personal_number if you want the FK
  });
  console.log({ alertId, alert });
  assert(alertId, "alertId must exist");

  console.log("\n=== 2) enqueue jobs in batch ===");
  const ids = subs.slice(0, 5).map((s) => s.id); // keep it small
  const payload = {
    title: 'נפעל נכס"ל',
    body: "היכנס לעדכון מיקום וסטטוס",
    data: { url: "https://your.site/status-update", alertId },
  };
  let enq = { count: 0, jobs: [] };
  if (ids.length > 0) {
    enq = await createJobsBatch({ alertId, subscriptionIds: ids, payload });
  }
  console.log("enqueued:", enq.count);

  console.log("\n=== 3) fetch pending jobs ===");
  const pending = await fetchPendingJobs({ limit: 10 });
  console.log("pending sample:", pending.slice(0, 3).map(j => j.id));

  if (pending.length > 0) {
    console.log("\n=== 4) mark one as failed (retry in 1m) and one as sent ===");
    const jobFail = pending[0];
    await markJobFailed(jobFail.id, { retryAt: new Date(Date.now() + 60_000) });

    const jobSend = pending[1] || jobFail;
    await markJobSent(jobSend.id);
  }

  if (enq.jobs?.[0]) {
    console.log("\n=== 5) mark another job disabled (best-effort disables subscription) ===");
    await markJobDisabled(enq.jobs[0].id);
  }

  console.log("\n=== 6) metrics for alert ===");
  // ensure alert exists (optional)
  await getAlertById(alertId);
  const metrics = await getAlertMetrics(alertId);
  console.log("metrics:", metrics);

  console.log("\nDONE ✅");
}

run().catch((e) => {
  console.error("Smoke failed ❌");
  console.error(e);
  process.exit(1);
});
