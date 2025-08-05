import {
  User,
  Role,
  Branch,
  Commission,
  CommissionDetail,
} from "../models/index.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
  res
    .status(200)
    .json({ message: "Ruta de usuario funcionando correctamente 🔥" });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [Role, Branch],
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [Role, Branch],
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener tu perfil", error: error.message });
  }
};

export const getUserCommissions = async (req, res) => {
  try {
    const { id } = req.params;

    // Si el usuario es asesor, solo puede ver su propio historial
    if (
      req.user.Role.name === "Asesor Comercial" &&
      req.user.id !== parseInt(id)
    ) {
      return res
        .status(403)
        .json({
          message: "Acceso denegado: solo puedes ver tu propio historial",
        });
    }

    const commissions = await Commission.findAll({
      where: { userId: id },
      include: [CommissionDetail],
    });

    res.status(200).json(commissions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener comisiones", error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { fullName, email, password, roleId, branchId, cedula } = req.body;

    // Validaciones básicas
    if (!fullName || !email || !password || !roleId || !branchId || !cedula) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si ya existe un usuario con ese email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Ya existe un usuario con ese correo" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      fullName,
      email,
      cedula,
      password: hashedPassword,
      roleId,
      branchId,
    });

    return res
      .status(201)
      .json({ message: "Usuario creado correctamente", userId: newUser.id });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.message });
  }
};
