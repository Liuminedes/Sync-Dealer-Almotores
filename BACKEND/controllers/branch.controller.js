import { Branch } from "../models/index.js";

export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener sedes" });
  }
};
