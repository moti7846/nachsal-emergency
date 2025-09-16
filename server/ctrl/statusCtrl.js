// ctrl/statusCtrl.js
import * as statusService from "../services/statusService.js";

/**
 * POST /status/update
 * Requires auth middleware that sets req.user (e.g., { id, role }).
 */
export async function update(req, res, next) {
  try {
    // soldierId: prefer authenticated user; fallback to body for admin overrides.
    const soldierId = req.user?.id ?? req.body?.soldierId;
    const { status, location } = req.body ?? {};

    const result = await statusService.updateSoldierStatus({
      soldierId,
      status,
      location
    });

    return res.status(200).json({ ok: true, data: result });
  } catch (err) {
    // Ensure consistent error shape
    const status = err.status ?? 500;
    return res.status(status).json({
      ok: false,
      error: { message: err.message ?? "Internal error" }
    });
  }
}

