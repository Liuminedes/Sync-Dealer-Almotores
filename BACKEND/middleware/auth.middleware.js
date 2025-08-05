import jwt from 'jsonwebtoken';
import { User, Role } from '../models/index.js';

// ✅ Autenticación básica por token
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: [Role],
    });

    if (!user) return res.status(401).json({ message: 'Usuario no válido' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// ✅ Autorización por nombre de rol (más legible que por ID)
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoleName = req.user.Role.name;

    if (!allowedRoles.includes(userRoleName)) {
      return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
    }

    next();
  };
};
