import { supabase, supabaseAdmin } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/response.js';

// GET /api/products — with optional ?category=slug&featured=true
export const getAllProducts = async (req, res, next) => {
  try {
    const { category, featured } = req.query;

    let query = supabase
      .from('products')
      .select('*, categories(id, name, slug)')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (category) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();

      if (!cat) return sendError(res, 'Category not found', 404);
      query = query.eq('category_id', cat.id);
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { products: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('products')
      .select('*, categories(id, name, slug)')
      .eq('id', id)
      .eq('is_visible', true)
      .single();

    if (error || !data) return sendError(res, 'Product not found', 404);

    return sendSuccess(res, { product: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/products  [admin]
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, material, category_id, images, is_featured } = req.body;

    if (!name || !category_id) {
      return sendError(res, 'Name and category_id are required', 400);
    }

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert({ name, description, material, category_id, images, is_featured })
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { product: data }, 'Product created', 201);
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id  [admin]
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, material, category_id, images, is_featured, is_visible } = req.body;

    const { data, error } = await supabaseAdmin
      .from('products')
      .update({ name, description, material, category_id, images, is_featured, is_visible, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { product: data }, 'Product updated');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id  [admin]
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, null, 'Product deleted');
  } catch (err) {
    next(err);
  }
};

// GET /api/products/admin/all  [admin] — sees hidden products too
export const getAllProductsAdmin = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*, categories(id, name, slug)')
      .order('created_at', { ascending: false });

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { products: data });
  } catch (err) {
    next(err);
  }
};