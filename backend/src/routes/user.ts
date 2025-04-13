// src/routes/user.ts

import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Open endpoints:
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword); // if already implemented

// Protected endpoints (user must be authenticated)
router.use(authenticate); // Any routes below here require authentication.

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// New endpoint for changing password (authenticated users only)
router.post('/change-password', userController.changePassword);

export default router;
