import { Router } from 'express';
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from '../controllers/banner.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

router.get('/', getBanners);

router.post('/', authMiddleware, adminMiddleware, createBanner);
router.patch('/:id', authMiddleware, adminMiddleware, updateBanner);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBanner);

export default router;