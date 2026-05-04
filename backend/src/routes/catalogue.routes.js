import { Router } from 'express';
import {
  getCatalogue,
  getAllCatalogues,
  uploadCatalogue,
  deleteCatalogue,
} from '../controllers/catalogue.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

router.get('/', getCatalogue);

router.get('/admin/all', authMiddleware, adminMiddleware, getAllCatalogues);
router.post('/', authMiddleware, adminMiddleware, uploadCatalogue);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCatalogue);

export default router;