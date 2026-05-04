import { supabase } from '../config/supabase.js';
import { supabaseAdmin } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/response.js';

// GET /api/categories
export const getAllCategories = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true });

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { categories: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/categories/:slug
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return sendError(res, 'Category not found', 404);

    return sendSuccess(res, { category: data });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/categories/:id/banner  [admin]
export const updateCategoryBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { banner_url } = req.body;

    if (!banner_url) return sendError(res, 'banner_url is required', 400);

    const { data, error } = await supabaseAdmin
      .from('categories')
      .update({ banner_url })
      .eq('id', id)
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { category: data }, 'Banner updated');
  } catch (err) {
    next(err);
  }
};