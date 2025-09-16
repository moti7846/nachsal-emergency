// scripts/dalSmoke.mjs
// Minimal smoke to verify Supabase connection + pushSubDAL upsert

import path from "path";
import { fileURLToPath } from "url";
import { config as loadEnv } from "dotenv";

// robust .env load: always load server/.env relative to this file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.resolve(__dirname, "../.env") });

// adjust these imports to match your exports in db/connect.js and DAL files
import supabase from "../db/connect.js";
import {
  upsertWebPushSubscription,
  getActiveSubscriptions,
  disableSubscriptionByEndpoint,
} from "../DAL/pushSubDAL.js";

// Optional import: soldierDAL.updateSoldierStatus (skip if not present)
let updateSoldierStatus = null;
try {
  const mod = await import("../DAL/soldierDAL.js");
  if (typeof mod.updateSoldierStatus === "function") {
    updateSoldierStatus = mod.updateSoldierStatus;
  } else {
    console.log("soldierDAL.updateSoldierStatus not exported - skipping");
  }
} catch {
  console.log("soldierDAL.js not found - skipping updateSoldierStatus");
}

function assert(cond, msg) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function run() {
  // Sanity DB
  const { data: sample, error } = await supabase.from("soldiers").select("personal_number").limit(1);
  if (error) throw error;
  console.log("soldiers sample:", sample);

  const personalNumber =
    process.env.TEST_PERSONAL_NUMBER ||
    (sample?.[0] && String(sample[0].personal_number)) ||
    "123456";

  const endpoint = `https://example.com/ep/${Date.now()}`;
  const p256dh = "p256dh_dummy_" + Date.now();
  const auth = "auth_dummy_" + Date.now();

  // Upsert
  const sub = await upsertWebPushSubscription({
    personalNumber,
    endpoint,
    p256dh,
    auth,
    userAgent: "dal/minimal",
  });
  console.log("upserted:", sub);
  assert(sub?.id, "subscription id should exist");

  // Verify active
  const actives = await getActiveSubscriptions();
  assert(actives.some((s) => s.endpoint === endpoint), "new endpoint should be active");

  // Disable
  const disabled = await disableSubscriptionByEndpoint({ personalNumber, endpoint });
  console.log("disabled:", disabled);

  // Optional: update soldier status if available
  if (updateSoldierStatus) {
    try {
      const u = await updateSoldierStatus({
        personalNumber,
        status: "on_the_way",
        location: "HQ",
      });
      console.log("soldier updated (optional):", u);
    } catch (e) {
      console.log("updateSoldierStatus optional failed:", e.message);
    }
  }

  console.log("\nMinimal DAL smoke passed ✅");
}

run().catch((e) => {
  console.error("Minimal DAL smoke failed ❌");
  console.error(e);
  process.exit(1);
});
