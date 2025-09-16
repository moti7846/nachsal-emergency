import supabase from "../db/connect.js";

export async function createJobsBatch({ alertId, subscriptionIds = [], payload }) {
  const id = Number(alertId);
  if (!Number.isFinite(id)) {
    const err = new Error("invalid alertId");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }
  if (!Array.isArray(subscriptionIds) || subscriptionIds.length === 0) {
    const err = new Error("subscriptionIds must be a non-empty array");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }
  if (typeof payload !== "object" || payload == null) {
    const err = new Error("payload must be an object");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }

  const rows = subscriptionIds.map((sid) => ({
    alert_id: id,
    subscription_id: Number(sid),
    payload,
    status: "pending",        // DB default also pending
    try_count: 0,             // DB default also 0
    next_retry_at: null,
  }));

  const { data, error } = await supabase
    .from("push_jobs")
    .insert(rows)
    .select("id, alert_id, subscription_id, status");

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_BATCH_INSERT_FAILED";
    throw err;
  }

  return { count: data?.length ?? 0, jobs: data ?? [] };
}

export async function fetchPendingJobs({ limit = 300, before = new Date() } = {}) {
  const beforeIso = new Date(before).toISOString();

  const { data, error } = await supabase
    .from("push_jobs")
    .select("id, alert_id, subscription_id, payload, try_count")
    .eq("status", "pending")
    .or(`next_retry_at.is.null,next_retry_at.lte.${beforeIso}`)
    .order("id", { ascending: true })
    .limit(limit);

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_SELECT_FAILED";
    throw err;
  }
  return data ?? [];
}

/** Mark a job as sent successfully */
export async function markJobSent(jobId) {
  const id = Number(jobId);
  const { data, error } = await supabase
    .from("push_jobs")
    .update({ status: "sent" })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_UPDATE_FAILED";
    throw err;
  }
  return data;
}

export async function markJobFailed(jobId, { retryAt }) {
  const id = Number(jobId);

  // Read current try_count
  const { data: row, error: selErr } = await supabase
    .from("push_jobs")
    .select("try_count")
    .eq("id", id)
    .single();

  if (selErr) {
    const err = new Error(selErr.message);
    err.status = 500;
    err.code = "DB_SELECT_FAILED";
    throw err;
  }

  const nextCount = (row?.try_count ?? 0) + 1;

  const { data, error } = await supabase
    .from("push_jobs")
    .update({
      status: "pending", // keep pending for retry
      try_count: nextCount,
      next_retry_at: retryAt ? new Date(retryAt).toISOString() : null,
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_UPDATE_FAILED";
    throw err;
  }
  return data;
}

export async function markJobDisabled(jobId) {
  const id = Number(jobId);

  // Fetch job to get subscription_id
  const { data: job, error: selErr } = await supabase
    .from("push_jobs")
    .select("id, subscription_id")
    .eq("id", id)
    .single();

  if (selErr) {
    const err = new Error(selErr.message);
    err.status = 500;
    err.code = "DB_SELECT_FAILED";
    throw err;
  }

  // 1) disable the job
  const { error: updErr } = await supabase
    .from("push_jobs")
    .update({ status: "disabled" })
    .eq("id", id);

  if (updErr) {
    const err = new Error(updErr.message);
    err.status = 500;
    err.code = "DB_UPDATE_FAILED";
    throw err;
  }

  // 2) best-effort: disable the subscription itself
  await supabase
    .from("push_subscriptions")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", job.subscription_id);

  return { id };
}

export async function getAlertMetrics(alertId) {
  const id = Number(alertId);
  if (!Number.isFinite(id)) {
    const err = new Error("invalid alertId");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }

  async function countByStatus(status) {
    const { count, error } = await supabase
      .from("push_jobs")
      .select("id", { count: "exact", head: true })
      .eq("alert_id", id)
      .eq("status", status);

    if (error) {
      const err = new Error(error.message);
      err.status = 500;
      err.code = "DB_COUNT_FAILED";
      throw err;
    }
    return count ?? 0;
  }

  const [pending, sent, failed, disabled] = await Promise.all([
    countByStatus("pending"),
    countByStatus("sent"),
    countByStatus("failed"),
    countByStatus("disabled"),
  ]);

  const total = pending + sent + failed + disabled;
  return { pending, sent, failed, disabled, total };
}
