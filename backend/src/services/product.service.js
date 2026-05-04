import { supabase } from "../config/supabase.js";

/* ======================
   CATEGORIES
====================== */

export async function getAllCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

/* ======================
   PRODUCTS
====================== */

export async function getProductsByCategorySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      short_description,
      description,
      categories ( name, slug )
    `)
    .eq("categories.slug", slug);

  if (error) throw new Error(error.message);
  return data;
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
export async function addProductImages(productId, images) {
  const { data, error } = await supabase
    .from("products")
    .update({ images })
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
