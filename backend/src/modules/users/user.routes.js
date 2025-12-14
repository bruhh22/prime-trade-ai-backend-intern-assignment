import express from 'express';
import * as userController from './user.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { authorizeRoles } from '../../middlewares/role.middleware.js';
import { ROLES } from '../../config/constants.js';

const router = express.Router();

// All routes here are protected and restricted to ADMIN only
router.use(protect);
router.use(authorizeRoles(ROLES.ADMIN));

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);

export default router;