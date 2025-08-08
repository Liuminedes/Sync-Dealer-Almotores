import { Branch } from "../models/index.js";

export const getBranches = async (req, res) => {
  const branches = await Branch.findAll();
  res.json(branches);
};

export const createBranch = async (req, res) => {
  try {
    const newBranch = await Branch.create(req.body);
    res.status(201).json(newBranch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};