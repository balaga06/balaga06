import { Router } from "express";
import multer from "multer";

import {
  getAllDocuments,
  getDocumentsByType,
  createDocument,
  deleteDocument,
  updateDocumentStatus,
} from "../controllers/documents.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= PUBLIC (WEBSITE) ================= */

// Fetch documents by type (reports, syllabus, meetings, etc.)
router.get("/:type", getDocumentsByType);

/* ================= ADMIN (PROTECTED) ================= */

// Get all documents (admin panel)
router.get("/admin", authMiddleware, getAllDocuments);

// Upload document
router.post("/", authMiddleware, upload.single("file"), createDocument);

// Delete document
router.delete("/:id", authMiddleware, deleteDocument);

// Update status (active / inactive)
router.put("/:id/status", authMiddleware, updateDocumentStatus);

export default router;