// services/statusService.js
import * as soldierDAL from "../DAL/soldierDAL.js";

/**
 * Update soldier status and optional location.
 * Enforces a small set of allowed statuses; adjust as needed.
 */
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
  // Validate inputs
  if (!soldierId) {
    const err = new Error("soldierId is required");
    err.status = 400;
    throw err;
  }
  if (!status || !ALLOWED_STATUSES.has(status)) {
    const err = new Error(
      `status must be one of: ${[...ALLOWED_STATUSES].join(", ")}`
    );
    err.status = 400;
    throw err;
  }
  // location is optional; allow string or object
  const locValue = location ?? null;

  // Persist
  const row = await soldierDAL.updateSoldierStatus({
    soldierId,
    status,
    location: locValue
  });

  return {
    soldierId: row.id ?? soldierId,
    status: row.status ?? status,
    location: row.location ?? locValue,
    updatedAt: row.updated_at ?? new Date().toISOString()
  };
}
