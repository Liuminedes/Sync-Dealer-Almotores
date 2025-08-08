import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No autorizado: token faltante" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error en protectRoute:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo para administradores" });
  }
  next();
};
