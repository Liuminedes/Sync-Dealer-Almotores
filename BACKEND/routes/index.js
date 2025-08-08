import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import branchRoutes from "./branch.routes.js";
import vehicleRoutes from "./vehicle.routes.js";
import commissionRoutes from "./commission.routes.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRoutes); // login sin proteger

// todas las rutas siguientes requieren token
router.use("/users", protectRoute, userRoutes);
router.use("/branches", protectRoute, branchRoutes);
router.use("/vehicles", protectRoute, vehicleRoutes);
router.use("/commissions", protectRoute, commissionRoutes);

export default router;
