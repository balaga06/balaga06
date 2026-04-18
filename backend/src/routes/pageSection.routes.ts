import { Router } from "express";
import {
  getAllSections,
  getSectionByKey,
  getSectionsByGroup,
  updateSection,
  createSection,
} from "../controllers/pageSection.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/* ================= PUBLIC ================= */
router.get("/key/:key", getSectionByKey);
router.get("/group/:group", getSectionsByGroup);

/* ================= ADMIN ================= */
router.get("/", authMiddleware, getAllSections); // ✅ FIXED
router.put("/:id", authMiddleware, updateSection);
router.post("/", authMiddleware, createSection);

export default router;