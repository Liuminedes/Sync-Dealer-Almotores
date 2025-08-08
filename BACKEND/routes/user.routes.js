import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAdmin, getUsers);
router.post("/", isAdmin, createUser);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

export default router;