import jwt from "jsonwebtoken";
import { User, Role } from "../models/index.js";

// ✅ Middleware para proteger rutas
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado: token no enviado" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: [Role],
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "No autorizado: usuario inválido" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error en protect middleware:", err.message);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// ✅ Middleware para autorizar por roles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoleId = req.user?.roleId;
    if (!allowedRoles.includes(userRoleId)) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: rol insuficiente" });
    }
    next();
  };
};
