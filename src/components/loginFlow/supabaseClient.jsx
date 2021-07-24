import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://odibfztkspawqhhelzkv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjc2NDc3NSwiZXhwIjoxOTQyMzQwNzc1fQ.vCNJTVWlGZgvIeYtoTM2zMweELtaL5H_6nE4VoCiBME";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)