import { supabase, supabaseAdmin } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/response.js';

// POST /api/auth/signup
export const signup = async (req, res, next) => {
  try {
    const { email, password, phone } = req.body;

    if (!email || !password || !phone) {
      return sendError(res, 'Email, password and phone are required', 400);
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return sendError(res, error.message, 400);

    // Save phone in profiles table
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({ id: data.user.id, phone });

    if (profileError) return sendError(res, profileError.message, 400);

    return sendSuccess(res, { user: data.user }, 'Signup successful', 201);
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return sendError(res, error.message, 401);

    return sendSuccess(res, {
      user: data.user,
      session: data.session,
    }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/logout
export const logout = async (req, res, next) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return sendError(res, error.message, 400);
    return sendSuccess(res, null, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) return sendError(res, error.message, 404);

    return sendSuccess(res, { profile: data });
  } catch (err) {
    next(err);
  }
};