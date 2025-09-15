import supabase from "../db/connect.js";

export async function saveSubscriptionToDB({ personal_number, endpoint, p256dh, auth }) {
  const { error } = await supabase
    .from("push_subscriptions")
    .upsert(
      {
        personal_number,
        endpoint,
        p256dh,
        auth,
        is_active: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: ["endpoint"] } 
    );

  if (error) {
    console.error("Failed to save subscription:", error);
    throw error;
  }
}
