import supabase from "../db/connect.js";

export async function resetReports() {
  const { data, error } = await supabase.rpc("reset_reports");
  if (error) throw error;
  return data;
}
