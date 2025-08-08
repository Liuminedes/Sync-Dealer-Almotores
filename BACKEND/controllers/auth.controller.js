import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ message: "Todos los campos son obligatorios" });

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Credenciales incorrectas" });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        branchId: user.branchId,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error en login", error: err.message });
  }
};

export const logout = (_, res) => {
  res.status(200).json({ message: "Logout exitoso (client-side debe borrar token)" });
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Error en checkAuth", error: error.message });
  }
};