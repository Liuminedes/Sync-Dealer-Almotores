import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

// 🔐 LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ msg: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ msg: "Error al iniciar sesión" });
  }
};

// ✅ REGISTER
export const register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      cedula,
      role, // 👈 Aquí estaba el error
      branchId,
    } = req.body;

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !cedula ||
      !role ||
      !branchId
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      cedula,
      role, // 👈 Campo correcto que existe en tu modelo
      branchId,
    });

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        branchId: newUser.branchId,
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

// 🚪 LOGOUT
export const logout = (_, res) => {
  res
    .status(200)
    .json({ message: "Logout exitoso (client-side debe borrar token)" });
};

// ✅ CHECK AUTH
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en checkAuth", error: error.message });
  }
};
