import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv";
config();

const supabaseUrl = 'https://zstomlvwpirsmeofgyrz.supabase.co'
const supabase = createClient(supabaseUrl, process.env.DB_PUBLIC_SECRET)

export default supabase;
