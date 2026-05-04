import { Router } from 'express';
import {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  getInquiryStats,
} from '../controllers/inquiry.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

// Public — no auth required (phone-gate is handled in controller)
router.post('/', createInquiry);

// Admin only
router.get('/', authMiddleware, adminMiddleware, getAllInquiries);
router.get('/stats', authMiddleware, adminMiddleware, getInquiryStats);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateInquiryStatus);

export default router;