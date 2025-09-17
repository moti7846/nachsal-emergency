import supabase from "../db/connect.js";

/** Create a new alert row (status defaults to 'active' in DB) */
export async function createAlert({ title, body, url, createdBy = null }) {
  if (typeof title !== "string" || !title.trim()) {
    const err = new Error("title is required");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }
  if (typeof body !== "string" || !body.trim()) {
    const err = new Error("body is required");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }
  if (typeof url !== "string" || !url.trim()) {
    const err = new Error("url is required");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }

  const payload = {
    title: String(title),
    body: String(body),
    url: String(url),
    created_by: createdBy ?? null, // nullable FK to soldiers.personal_number
    // status left to DB default ('active')
  };

  const { data, error } = await supabase
    .from("alerts")
    .insert(payload)
    .select("id, title, created_at, status")
    .single();

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_INSERT_FAILED";
    throw err;
  }
  return { alertId: data.id, alert: data };
}

/** Get alert by id */
export async function getAlertById(alertId) {
  const id = Number(alertId);
  if (!Number.isFinite(id)) {
    const err = new Error("invalid alertId");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }

  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_SELECT_FAILED";
    throw err;
  }
  return data;
}

/** Optional: end/close an alert (set status='ended') */
export async function endAlert(alertId) {
  const id = Number(alertId);
  if (!Number.isFinite(id)) {
    const err = new Error("invalid alertId");
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }

  const { data, error } = await supabase
    .from("alerts")
    .update({ status: "ended" })
    .eq("id", id)
    .select("id, status")
    .single();

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_UPDATE_FAILED";
    throw err;
  }
  return data;
}

