import { resetReports } from "../DAL/nachsalDal.js";

// Business logi / API endpoint handler
export async function reset(req, res) {
  try {
    await resetReports();
    res
      .status(200)
      .json({ message: "Nekesel activated - report table has been reset" });
  } catch (err) {
    console.error("Error activating Nekesel:", err);
    res.status(500).json({ error: "Failed to activate Nekesel" });
  }
}
