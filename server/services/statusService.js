import * as soldierDAL from "../DAL/soldierDAL.js";

/** Allow-list of statuses; adjust as needed */
const ALLOWED_STATUSES = new Set([
  "ok",
  "safe",
  "on-duty",
  "off-duty",
  "busy",
  "injured",
  "missing",
  "unknown"
]);

export async function updateSoldierStatus({ soldierId, status, location }) {
  if (!soldierId) {
    const err = new Error("soldierId is required");
    err.status = 400;
    throw err;
  }
  if (!status || !ALLOWED_STATUSES.has(status)) {
    const err = new Error(`status must be one of: ${[...ALLOWED_STATUSES].join(", ")}`);
    err.status = 400;
    throw err;
  }

  const updated = await soldierDAL.updateSoldierStatus({
    soldierId,
    status,
    location: location ?? null
  });

  return updated;
}
