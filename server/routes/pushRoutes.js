import { Router } from "express";
import { subscribe, unsubscribe, getVapidKey } from "../ctrl/pushCtrl.js";
import { requireAuth } from "../middelware/requireAuth.js";

const push = Router();

// This route is public as the VAPID key is required for the client to subscribe.
push.get("/vapid-key", getVapidKey);

// All subsequent routes in this file require authentication
push.use(requireAuth);

push.post("/subscribe", subscribe);

push.delete("/unsubscribe", unsubscribe);

export default push;
