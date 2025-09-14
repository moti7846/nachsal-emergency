import supabase from "../db/connect.js";


export async function resetReports() {
  await supabase`SELECT reset_reports();`
}
