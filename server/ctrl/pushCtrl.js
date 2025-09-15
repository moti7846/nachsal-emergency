import { getPublicKey, sendNotification } from "../services/pushService.js";
import { saveSubscriptionToDB } from "../DAL/pushDal.js";

export function getKey(req, res) {
  res.json({ publicKey: getPublicKey() });
}

export async function subscribe(req, res) {
  const { personal_number, endpoint, p256dh, auth } = req.body;

  if (!personal_number || !endpoint || !p256dh || !auth) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await saveSubscriptionToDB({ personal_number, endpoint, p256dh, auth });
    res.status(201).json({ message: "Subscription saved" });
  } catch (err) {
    console.error("Failed to save subscription", err);
    res.status(500).json({ error: "Failed to save subscription" });
  }
}
