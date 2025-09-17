import supabase from "../db/connect.js";

export async function resetReports() {
  console.log(">>> CALLING rpc reset_reports");
  const { data, error } = await supabase.rpc("reset_reports");
  console.log(">>> RESULT:", { data, error });
  if (error) throw error;
  return data;
}
