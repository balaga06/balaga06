import express from "express";
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin.controller";

import { loginAdmin } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

/* ===== LOGIN ===== */
router.post("/login", loginAdmin);

/* ===== PROTECTED ===== */
router.get("/", authMiddleware, getAdmins);
router.post("/", authMiddleware, createAdmin);
router.put("/:id", authMiddleware, updateAdmin);
router.delete("/:id", authMiddleware, deleteAdmin);

export default router;