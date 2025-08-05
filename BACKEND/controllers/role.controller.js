import { Role } from "../models/index.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener roles" });
  }
};
