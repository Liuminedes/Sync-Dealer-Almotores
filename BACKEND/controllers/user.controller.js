import bcrypt from "bcryptjs";
import { User, Branch } from "../models/index.js";

export const getUsers = async (req, res) => {
  const users = await User.findAll({ include: Branch });
  res.status(200).json(users);
};

export const createUser = async (req, res) => {
  try {
    const { fullName, username, email, password, role, branchId } = req.body;

    if (!fullName || !username || !email || !password || !role) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) return res.status(409).json({ message: "El username ya está en uso" });

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return res.status(409).json({ message: "El email ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role,
      branchId
    });

    res.status(201).json({
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      branchId: newUser.branchId
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, username, email, password, role, branchId } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) return res.status(409).json({ message: "El username ya está en uso" });
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) return res.status(409).json({ message: "El email ya está registrado" });
      user.email = email;
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    user.fullName = fullName || user.fullName;
    user.role = role || user.role;
    user.branchId = branchId || user.branchId;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};