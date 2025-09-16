import { createAlert, getAlertById } from "../DAL/alertsDAL.js";
import { getActiveSubscriptions, } from "../DAL/pushSubDAL.js";
import { createJobsBatch, getAlertMetrics } from "../DAL/pushJobsDAL.js";

/** Small helper to chunk arrays to avoid massive single insert */
function chunk(arr, size = 500) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const activate = async (req, res, next) => {
  try {
    const { title, body, url } = req.body || {};
    if (!title || !body || !url) {
      const err = new Error("Missing required fields: title, body, url");
      err.status = 400;
      return next(err);
    }

    // createdBy from auth (optional)
    const createdBy =
      req.user?.personal_number || req.user?.personalNumber || null;

    // 1) Create alert
    const { alertId, alert } = await createAlert({
      title: String(title),
      body: String(body),
      url: String(url),
      createdBy: createdBy ? String(createdBy) : null,
    });

    // 2) Get active subscriptions
    const subs = await getActiveSubscriptions();
    const ids = subs.map((s) => s.id);

    // 3) Prepare push payload (stored as JSONB on each job)
    const payload = {
      title: String(title),
      body: String(body),
      data: { url: String(url), alertId },
    };

    // 4) Enqueue jobs (chunked)
    let total = 0;
    for (const part of chunk(ids, 800)) {
      const batch = await createJobsBatch({ alertId, subscriptionIds: part, payload });
      total += batch.count;
    }

    return res.status(201).json({
      message: "alert activated and jobs enqueued",
      alertId,
      enqueued: total,
    });
  } catch (err) {
    next(err);
  }
};

const metrics = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Ensure alert exists (optional but useful)
    await getAlertById(id);

    const agg = await getAlertMetrics(id);
    return res.status(200).json({ alertId: Number(id), metrics: agg });
  } catch (err) {
    next(err);
  }
};

export { activate, metrics };
