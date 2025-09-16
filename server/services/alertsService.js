import * as alertsDAL from "../DAL/alertsDAL.js";
import * as pushSubDAL from "../DAL/pushSubDAL.js";
import * as pushJobsDAL from "../DAL/pushJobsDAL.js";
import { preparePayload } from "./pushService.js";

export async function createAlertAndEnqueueJobs({ title, body, url, createdBy }) {
  // Basic validation
  if (!title || !body) {
    const err = new Error("title and body are required");
    err.status = 400;
    throw err;
  }

  // 1) Create alert
  const { alertId } = await alertsDAL.createAlert({ title, body, url: url || null, createdBy });

  // 2) Collect active subscriptions
  const subs = await pushSubDAL.getActiveSubscriptions(); // expected: [{ id, endpoint, keys:{p256dh,auth}, ... }, ...]
  const subscriptionIds = subs.map(s => s.id);
  const subsCount = subscriptionIds.length;

  // 3) Prepare payload once (lightweight)
  const payload = preparePayload({ title, body, url });

  // 4) Enqueue push jobs in batch (DAL decides chunking/limits)
  const jobsCreated = await pushJobsDAL.createJobsBatch({
    alertId,
    subscriptionIds,
    payload
  });

  return { alertId, subsCount, jobsCreated };
}

export async function getMetrics(alertId) {
  if (!alertId) {
    const err = new Error("alertId is required");
    err.status = 400;
    throw err;
  }
  const metrics = await pushJobsDAL.getAlertMetrics(alertId);
  return metrics;
}
