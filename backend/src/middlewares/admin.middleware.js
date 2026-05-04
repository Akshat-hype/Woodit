import { supabaseAdmin } from '../config/supabase.js';

export const adminMiddleware = async (req, res, next) => {
  try {
    // authMiddleware must run before this — req.user is already set
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(req.user.id);

    if (error || !user) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    // Check for admin role in user metadata
    if (user.user_metadata?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access only' });
    }

    next();
  } catch (err) {
    next(err);
  }
};