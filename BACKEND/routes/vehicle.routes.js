import express from "express";
import { getVehicles, createVehicle, updateVehicle } from "../controllers/vehicle.controller.js";
const router = express.Router();

router.get("/", getVehicles);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);

export default router;