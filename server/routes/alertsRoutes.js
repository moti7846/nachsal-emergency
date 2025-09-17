import { Router } from "express";
import { activate, metrics, end } from "../ctrl/alertsCtrl.js";
import { requireAuth } from "../middelware/requireAuth.js";

const alert = Router();

// Routes that change state should be protected
alert.post("/activate", requireAuth, activate);
alert.post("/:id/end", requireAuth, end);

// Metrics can remain public for now, or add a role-based check later
alert.get("/:id/metrics", metrics);

export default alert;
