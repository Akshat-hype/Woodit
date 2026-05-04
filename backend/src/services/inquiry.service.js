import { supabase } from "../config/supabase.js";

export async function createInquiry({ phone, category, productName }) {
  const { data, error } = await supabase
    .from("inquiries")
    .insert([
      {
        phone,
        category,
        product_name: productName,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllInquiries() {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
