import { Router } from 'express';
import multer from 'multer';
import { uploadMediaFile } from '../controllers/media.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'application/pdf',
    ];

    if (!allowed.includes(file.mimetype)) {
      cb(new Error('Unsupported file type'));
      return;
    }

    cb(null, true);
  },
});

router.post('/upload', authMiddleware, adminMiddleware, upload.single('file'), uploadMediaFile);

export default router;
