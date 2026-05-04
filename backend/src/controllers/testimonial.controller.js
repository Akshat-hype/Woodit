import { supabase, supabaseAdmin } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/response.js';

// GET /api/testimonials
export const getTestimonials = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { testimonials: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/testimonials/admin/all  [admin]
export const getAllTestimonialsAdmin = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { testimonials: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/testimonials  [admin]
export const createTestimonial = async (req, res, next) => {
  try {
    const { client_name, company, testimonial_text, image_url } = req.body;

    if (!client_name || !testimonial_text) {
      return sendError(res, 'client_name and testimonial_text are required', 400);
    }

    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert({ client_name, company, testimonial_text, image_url })
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { testimonial: data }, 'Testimonial created', 201);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/testimonials/:id  [admin]
export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { client_name, company, testimonial_text, image_url, is_visible } = req.body;

    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .update({ client_name, company, testimonial_text, image_url, is_visible })
      .eq('id', id)
      .select()
      .single();

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, { testimonial: data }, 'Testimonial updated');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/testimonials/:id  [admin]
export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) return sendError(res, error.message, 400);

    return sendSuccess(res, null, 'Testimonial deleted');
  } catch (err) {
    next(err);
  }
};