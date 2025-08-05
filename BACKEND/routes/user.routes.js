import express from 'express';
import {
  test,
  getAllUsers,
  getMe,
  getUserCommissions,
  createUser, // 🆕 importar función nueva
} from '../controllers/user.controller.js';

import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// Ruta de prueba
router.get('/test', test);

// ✅ Solo Admin puede ver todos los usuarios
router.get('/', protect, authorizeRoles(1), getAllUsers);

// ✅ Todos los usuarios pueden ver su perfil
router.get('/me', protect, getMe);

// ✅ Ruta para ver comisiones de un usuario
router.get('/:id/commissions', protect, getUserCommissions);

// ✅ Solo Admin puede crear usuarios
router.post('/', protect, authorizeRoles(1), createUser); // 🆕

export default router;
