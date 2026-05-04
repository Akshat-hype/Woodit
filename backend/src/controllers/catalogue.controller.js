import { supabase, supabaseAdmin } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/response.js';

// GET /api/catalogue — latest catalogue for public download
export const getCatalogue = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('catalogue')
      .select('*')
      .order('uploaded_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return sendError(res, 'No catalogue available', 404);

    return sendSuccess(res, { catalogue: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/catalogue/admin/all  [admin]
export const getAllCatalogues = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('catalogue')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { catalogues: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/catalogue  [admin]
export const uploadCatalogue = async (req, res, next) => {
  try {
    const { file_name, file_url, version } = req.body;

    if (!file_name || !file_url) {
      return sendError(res, 'file_name and file_url are required', 400);
    }

    const { data, error } = await supabaseAdmin
      .from('catalogue')
      .insert({ file_name, file_url, version })
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { catalogue: data }, 'Catalogue uploaded', 201);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/catalogue/:id  [admin]
export const deleteCatalogue = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('catalogue')
      .delete()
      .eq('id', id);

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, null, 'Catalogue deleted');
  } catch (err) {
    next(err);
  }
};