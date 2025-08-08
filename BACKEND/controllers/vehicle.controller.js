import { Vehicle, User } from "../models/index.js";

export const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.findAll({ include: { model: User, as: "asesor" } });
  res.json(vehicles);
};

export const createVehicle = async (req, res) => {
  try {
    const newVehicle = await Vehicle.create(req.body);
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    await Vehicle.update(req.body, { where: { id } });
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};