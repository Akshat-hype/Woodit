import { supabase, supabaseAdmin } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/response.js';

// GET /api/banners?type=hero  or  ?type=category&slug=chair-gallery
export const getBanners = async (req, res, next) => {
  try {
    const { type, slug } = req.query;

    let query = supabase
      .from('banners')
      .select('*')
      .eq('is_active', true);

    if (type) query = query.eq('type', type);
    if (slug) query = query.eq('category_slug', slug);

    const { data, error } = await query;
    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { banners: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/banners  [admin]
export const createBanner = async (req, res, next) => {
  try {
    const { type, category_slug, media_url, media_type } = req.body;

    if (!type || !media_url) {
      return sendError(res, 'type and media_url are required', 400);
    }

    if (type === 'category' && !category_slug) {
      return sendError(res, 'category_slug is required for category banners', 400);
    }

    const { data, error } = await supabaseAdmin
      .from('banners')
      .insert({ type, category_slug, media_url, media_type })
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { banner: data }, 'Banner created', 201);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/banners/:id  [admin]
export const updateBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { media_url, media_type, is_active } = req.body;

    const { data, error } = await supabaseAdmin
      .from('banners')
      .update({ media_url, media_type, is_active })
      .eq('id', id)
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { banner: data }, 'Banner updated');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/banners/:id  [admin]
export const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('banners')
      .delete()
      .eq('id', id);

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, null, 'Banner deleted');
  } catch (err) {
    next(err);
  }
};