import { supabase } from "../config/supabase.js";

export async function findAdminByEmail(email) {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw new Error("Invalid credentials");
  return data;
}
