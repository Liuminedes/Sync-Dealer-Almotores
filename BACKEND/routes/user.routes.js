import express from 'express';
import {
  test,
  getAllUsers,
  getMe,
  getUserCommissions
} from '../controllers/user.controller.js';

import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// Ruta de prueba
router.get('/test', test);

// ✅ Solo Admin puede ver todos los usuarios
router.get('/', protect, authorizeRoles('Admin'), getAllUsers);

// ✅ Todos los usuarios pueden ver su perfil
router.get('/me', protect, getMe);

// ✅ Ruta para ver comisiones de un usuario
router.get('/:id/commissions', protect, getUserCommissions);

export default router;
