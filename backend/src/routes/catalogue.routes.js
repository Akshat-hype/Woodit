import { Router } from 'express';
import {
  getCatalogue,
  getAllCatalogues,
  uploadCatalogue,
  deleteCatalogue,
} from '../controllers/catalogue.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import { uploadCataloguePdf } from '../middlewares/uploadCatalogue.js';

const router = Router();

// Public
router.get('/', getCatalogue);

// Admin
router.get(
  '/admin/all',
  authMiddleware,
  adminMiddleware,
  getAllCatalogues
);

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  uploadCataloguePdf.single('pdf'),
  uploadCatalogue
);

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  deleteCatalogue
);

export default router;