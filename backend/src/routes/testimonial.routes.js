import { Router } from 'express';
import {
  getTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonial.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

router.get('/', getTestimonials);

router.get('/admin/all', authMiddleware, adminMiddleware, getAllTestimonialsAdmin);
router.post('/', authMiddleware, adminMiddleware, createTestimonial);
router.patch('/:id', authMiddleware, adminMiddleware, updateTestimonial);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTestimonial);

export default router;