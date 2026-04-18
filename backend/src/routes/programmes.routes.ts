import { Router } from "express";
import {
  getProgrammes,
  getProgrammesPublic,
  createProgramme,
  updateProgramme,
  deleteProgramme,
  reorderProgrammes,
} from "../controllers/programmes.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/* ================= PUBLIC (WEBSITE) ================= */
// ✅ Only active programmes
router.get("/public", getProgrammesPublic);

/* ================= ADMIN ================= */
// ✅ All programmes (active + inactive)
router.get("/", authMiddleware, getProgrammes);

// CREATE
router.post("/", authMiddleware, createProgramme);

// UPDATE
router.put("/:id", authMiddleware, updateProgramme);

// DELETE
router.delete("/:id", authMiddleware, deleteProgramme);

// REORDER
router.put("/reorder", authMiddleware, reorderProgrammes);

export default router;