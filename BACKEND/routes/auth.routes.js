import express from "express";
import { login, logout, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.get("/check-auth", protectRoute, checkAuth);

export default router;