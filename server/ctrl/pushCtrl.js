import {
  upsertWebPushSubscription,
  disableSubscriptionByEndpoint,
} from "../DAL/pushSubDAL.js";

function getPersonalNumber(req) {
  // Adjust to your auth middleware if it sets a different path/claim
  return (
    req.user?.personal_number ||
    req.user?.personalNumber ||
    req.body?.personalNumber ||
    req.query?.personalNumber ||
    null
  );
}

const subscribe = async (req, res, next) => {
  try {
    const personalNumber = getPersonalNumber(req);
    const { endpoint, p256dh, auth } = req.body || {};

    if (!personalNumber || !endpoint || !p256dh || !auth) {
      const err = new Error("Missing required fields: personalNumber, endpoint, p256dh, auth");
      err.status = 400;
      return next(err);
    }

    const sub = await upsertWebPushSubscription({
      personalNumber: String(personalNumber),
      endpoint: String(endpoint),
      p256dh: String(p256dh),
      auth: String(auth),
    });

    return res.status(201).json({ message: "subscription upserted", subscription: sub });
  } catch (err) {
    next(err);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    const personalNumber = getPersonalNumber(req);
    // Accept endpoint either from body or query (DELETE with body is sometimes awkward)
    const endpoint = req.body?.endpoint || req.query?.endpoint;

    if (!personalNumber || !endpoint) {
      const err = new Error("Missing required fields: personalNumber, endpoint");
      err.status = 400;
      return next(err);
    }

    const result = await disableSubscriptionByEndpoint({
      personalNumber: String(personalNumber),
      endpoint: String(endpoint),
    });

    // 204 if you prefer no body; keeping 200 for easier client handling
    return res.status(200).json({ message: "subscription disabled", id: result.id });
  } catch (err) {
    next(err);
  }
};

const getVapidKey = (req, res) => {
  const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) {
    return res.status(500).json({
      ok: false,
      error: {
        code: "VAPID_KEY_NOT_CONFIGURED",
        message: "VAPID public key is not configured on the server.",
      },
    });
  }
  res.status(200).json({ vapidPublicKey });
};

export { subscribe, unsubscribe, getVapidKey };
