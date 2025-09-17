import { createAlert, getAlertById, endAlert } from "../DAL/alertsDAL.js";
import { getActiveSubscriptions, getSubscriptionsByPersonalNumbers } from "../DAL/pushSubDAL.js";
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

const end = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await endAlert(id);
    return res.status(200).json({
      message: "alert ended successfully",
      alert: result,
    });
  } catch (err) {
    next(err);
  }
};

const activateSelective = async (req, res, next) => {
  try {
    const { title, body, url, personalNumbers } = req.body || {};
    if (!title || !body || !url || !Array.isArray(personalNumbers) || personalNumbers.length === 0) {
      const err = new Error("Missing required fields: title, body, url, and a non-empty array of personalNumbers");
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

    // 2) Get active subscriptions for specified personal numbers
    const subs = await getSubscriptionsByPersonalNumbers(personalNumbers);
    const ids = subs.map((s) => s.id);

    if (ids.length === 0) {
      return res.status(200).json({
        message: "alert created, but no active subscriptions found for the provided personal numbers",
        alertId,
        enqueued: 0,
      });
    }

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
      message: "selective alert activated and jobs enqueued",
      alertId,
      enqueued: total,
    });
  } catch (err) {
    next(err);
  }
};

export { activate, metrics, end, activateSelective };
