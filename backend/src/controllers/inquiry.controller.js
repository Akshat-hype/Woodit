import { supabase, supabaseAdmin } from "../config/supabase.js";
import { sendSuccess, sendError } from "../utils/response.js";

// POST /api/inquiries — triggered when user enters phone & clicks a product
export const createInquiry = async (req, res, next) => {
  try {
    const { phone, product_id } = req.body;

    if (!phone || !product_id) {
      return sendError(res, "Phone and product_id are required", 400);
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return sendError(res, "Invalid phone number", 400);
    }

    // Fetch product details
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*, categories(id, name, slug)")
      .eq("id", product_id)
      .eq("is_visible", true)
      .single();

    if (productError || !product) {
      console.error("Product lookup failed:", productError);
      return sendError(res, "Product not found", 404);
    }

    // Check for duplicate inquiry (same phone + product within 24 hrs)
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: existing } = await supabaseAdmin
      .from("inquiries")
      .select("id")
      .eq("phone", phone)
      .eq("product_id", product_id)
      .gte("created_at", since)
      .maybeSingle();

    if (existing) {
      // Don't block — just return product silently (no duplicate entry)
      return sendSuccess(res, { product }, "Inquiry already exists");
    }

    // Create inquiry
    const { error: inquiryError } = await supabaseAdmin
      .from("inquiries")
      .insert({
        phone,
        product_id: product.id,
        product_name: product.name,
        category_slug: product.categories?.slug,
      });

    if (inquiryError) {
      console.error("Failed to insert inquiry:", inquiryError);
      return sendError(res, inquiryError.message, 400);
    }

    // Return product details so frontend can display them
    return sendSuccess(res, { product }, "Inquiry created", 201);
  } catch (err) {
    next(err);
  }
};

// GET /api/inquiries  [admin]
export const getAllInquiries = async (req, res, next) => {
  try {
    const { status, category } = req.query;

    let query = supabaseAdmin
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (category) query = query.eq("category_slug", category);

    const { data, error } = await query;
    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { inquiries: data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/inquiries/:id/status  [admin]
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["new", "contacted", "closed"];
    if (!validStatuses.includes(status)) {
      return sendError(res, "Invalid status value", 400);
    }

    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { inquiry: data }, "Status updated");
  } catch (err) {
    next(err);
  }
};

// GET /api/inquiries/stats  [admin] — for dashboard
export const getInquiryStats = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .select("status");

    if (error) return sendError(res, error.message, 400);

    const stats = {
      total: data.length,
      new: data.filter((i) => i.status === "new").length,
      contacted: data.filter((i) => i.status === "contacted").length,
      closed: data.filter((i) => i.status === "closed").length,
    };

    return sendSuccess(res, { stats });
  } catch (err) {
    next(err);
  }
};
