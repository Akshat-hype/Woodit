import { Router } from 'express';
import {
  getAllCategories,
  getCategoryBySlug,
  updateCategoryBanner,
} from '../controllers/category.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

router.get('/', getAllCategories);
router.get('/:slug', getCategoryBySlug);
router.patch('/:id/banner', authMiddleware, adminMiddleware, updateCategoryBanner);

export default router;