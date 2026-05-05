import { sendSuccess, sendError } from '../utils/response.js';
import { uploadMedia } from '../services/media.service.js';

export const uploadMediaFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'File is required', 400);
    }

    const folder = req.body.folder || 'general';
    const media = await uploadMedia(req.file, folder);

    return sendSuccess(res, { media }, 'File uploaded', 201);
  } catch (err) {
    next(err);
  }
};
