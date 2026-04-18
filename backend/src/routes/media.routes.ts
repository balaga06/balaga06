import { Router } from "express";
import {
  getMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
} from "../controllers/media.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../config/multer";

const router = Router();

/* ================= PUBLIC ROUTES ================= */

// Get all media
router.get("/", getMedia);

// Get single media by ID
router.get("/:id", getMediaById);

/* ================= PROTECTED ROUTES ================= */

// Upload media
router.post(
  "/",
  authMiddleware,
  upload.single("image"), // ✅ MUST MATCH FRONTEND
  createMedia
);

// Update media
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"), // ✅ OPTIONAL IMAGE UPDATE
  updateMedia
);

// Delete media
router.delete("/:id", authMiddleware, deleteMedia);

export default router;