import express from 'express';
import * as productController from './product.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../config/constants.js';

const router = express.Router();

// Public/User routes (Depending on requirements, maybe protect them)
router.get('/', protect, productController.getProducts);
router.get('/:id', protect, productController.getProduct);

// Admin only routes
router.post('/', protect, authorizeRoles(ROLES.ADMIN), productController.createProduct);
router.put('/:id', protect, authorizeRoles(ROLES.ADMIN), productController.updateProduct);
router.delete('/:id', protect, authorizeRoles(ROLES.ADMIN), productController.deleteProduct);

export default router;