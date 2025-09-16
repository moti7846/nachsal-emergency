import supabase from "../db/connect.js";

/** Basic string validation */
function assertString(val, field) {
  if (typeof val !== "string" || !val.trim()) {
    const err = new Error(`Invalid or missing field: ${field}`);
    err.status = 400;
    err.code = "VALIDATION_ERROR";
    throw err;
  }
}

export async function upsertWebPushSubscription({
  personalNumber,
  endpoint,
  p256dh,
  auth,
}) {
  assertString(personalNumber, "personalNumber");
  assertString(endpoint, "endpoint");
  assertString(p256dh, "p256dh");
  assertString(auth, "auth");

  // 1) Check if endpoint already exists
  const { data: existing, error: selErr } = await supabase
    .from("push_subscriptions")
    .select("id, personal_number")
    .eq("endpoint", endpoint)
    .maybeSingle();

  if (selErr) {
    const err = new Error(selErr.message);
    err.status = 500;
    err.code = "DB_SELECT_FAILED";
    throw err;
  }

  const nowIso = new Date().toISOString();

  if (existing?.id) {
    // 2) Update existing row
    const { data, error } = await supabase
      .from("push_subscriptions")
      .update({
        personal_number: personalNumber,
        p256dh,
        auth,
        is_active: true,
        updated_at: nowIso,
      })
      .eq("id", existing.id)
      .select("id, personal_number, endpoint, is_active")
      .single();

    if (error) {
      const err = new Error(error.message);
      err.status = 500;
      err.code = "DB_UPDATE_FAILED";
      throw err;
    }
    return data;
  }

  // 3) Insert a new row
  const insertPayload = {
    personal_number: personalNumber,
    endpoint,
    p256dh,
    auth,
    is_active: true,
    updated_at: nowIso, // created_at handled by DB default
  };

  const { data, error } = await supabase
    .from("push_subscriptions")
    .insert(insertPayload)
    .select("id, personal_number, endpoint, is_active")
    .single();

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_INSERT_FAILED";
    throw err;
  }
  return data;
}

export async function disableSubscriptionByEndpoint({
  personalNumber,
  endpoint,
}) {
  assertString(personalNumber, "personalNumber");
  assertString(endpoint, "endpoint");

  const { data, error } = await supabase
    .from("push_subscriptions")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("personal_number", personalNumber)
    .eq("endpoint", endpoint)
    .select("id")
    .single();

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_UPDATE_FAILED";
    throw err;
  }
  return data;
}

export async function getActiveSubscriptions() {
  const { data, error } = await supabase
    .from("push_subscriptions")
    .select("id, personal_number, endpoint, p256dh, auth")
    .eq("is_active", true);

  if (error) {
    const err = new Error(error.message);
    err.status = 500;
    err.code = "DB_SELECT_FAILED";
    throw err;
  }
  return data ?? [];
}

export async function getSubscriptionById(id) {
  if (!id) throw new Error('getSubscriptionById: id is required');

  // Using maybeSingle() to return null when not found without throwing.
  const { data, error } = await supabase
    .from('push_subscriptions')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
}
