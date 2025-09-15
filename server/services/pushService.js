import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

/**
 * Send a push notification to a given subscription.
 * @param {Object} subscription - The push subscription object {endpoint, keys:{p256dh, auth}}
 * @param {Object} payload - The payload data to send (will be stringified)
 * @returns {Promise<void>}
 */
export async function sendNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (err) {
    // Handle expired or invalid subscriptions
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.warn("Subscription is no longer valid:", subscription.endpoint);
      // You should disable or remove this subscription in your DB here
    } else {
      console.error("Push error:", err);
    }
  }
}
