import express from "express";
import { login, register, logout, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register); // 👈 nuevo endpoint
router.post("/logout", protectRoute, logout);
router.get("/check-auth", protectRoute, checkAuth);

export default router;