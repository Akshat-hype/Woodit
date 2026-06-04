import { supabase, supabaseAdmin } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/response.js';
import path from 'path';

// GET /api/catalogue
// Returns the latest uploaded catalogue
export const getCatalogue = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('catalogue')
      .select('*')
      .order('uploaded_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return sendError(res, 'No catalogue available', 404);
    }

    return sendSuccess(res, { catalogue: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/catalogue/admin/all
// Returns all catalogues
export const getAllCatalogues = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('catalogue')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      return sendError(res, error.message, 400);
    }

    return sendSuccess(res, { catalogues: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/catalogue
// Upload PDF to Supabase Storage and save metadata
export const uploadCatalogue = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return sendError(res, 'PDF file is required', 400);
    }

    const fileExt = path.extname(req.file.originalname);

    if (fileExt.toLowerCase() !== '.pdf') {
      return sendError(res, 'Only PDF files are allowed', 400);
    }

    const fileName = `catalogue-${Date.now()}${fileExt}`;

    // Upload PDF to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('catalogue-pdfs')
      .upload(fileName, req.file.buffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      return sendError(res, uploadError.message, 400);
    }

    // Get Public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('catalogue-pdfs')
      .getPublicUrl(fileName);

    // Save metadata to database
    const { data, error } = await supabaseAdmin
      .from('catalogue')
      .insert({
        title,
        description,
        file_name: fileName,
        file_url: publicUrlData.publicUrl,
      })
      .select()
      .single();

    if (error) {
      // Cleanup uploaded file if DB insert fails
      await supabaseAdmin.storage
        .from('catalogue-pdfs')
        .remove([fileName]);

      return sendError(res, error.message, 400);
    }

    return sendSuccess(
      res,
      { catalogue: data },
      'Catalogue uploaded successfully',
      201
    );
  } catch (err) {
    next(err);
  }
};

// DELETE /api/catalogue/:id
// Delete PDF from storage and database
export const deleteCatalogue = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: catalogue, error: fetchError } = await supabaseAdmin
      .from('catalogue')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !catalogue) {
      return sendError(res, 'Catalogue not found', 404);
    }

    // Delete PDF from Storage
    const { error: storageError } = await supabaseAdmin.storage
      .from('catalogue-pdfs')
      .remove([catalogue.file_name]);

    if (storageError) {
      console.error('Storage delete error:', storageError);
    }

    // Delete DB record
    const { error } = await supabaseAdmin
      .from('catalogue')
      .delete()
      .eq('id', id);

    if (error) {
      return sendError(res, error.message, 400);
    }

    return sendSuccess(res, null, 'Catalogue deleted successfully');
  } catch (err) {
    next(err);
  }
};