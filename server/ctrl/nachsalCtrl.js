import * as nachsalDAL from "../DAL/nachsalDal.js";

export async function reset(req, res, next) {
  try {
    const result = await nachsalDAL.resetReports();
    return res.status(200).json({ ok: true, data: result, time: new Date().toISOString() });
  } catch (err) {
    console.error("Error activating Nekesel:", err);
    return res.status(500).json({
      error: "Failed to activate Nekesel",
      details: err.message // <-- keep details for quick diagnosis
    });
  }
}
