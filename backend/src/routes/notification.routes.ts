import { Router } from "express";
import {
  getNotifications,
  getNotificationById,
  getPublicNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { uploadNotification } from "../middleware/uploadNotification.middleware";

const router = Router();

/* =========================
   VALIDATION MIDDLEWARE
========================= */
const validateId = (req: any, res: any, next: any) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  next();
};

/* =========================
   🔓 PUBLIC ROUTES
========================= */

/* 🔥 OPTIONAL: supports filtering (type, programme, branch) */
router.get("/public", getPublicNotifications);

/* =========================
   🔐 ADMIN ROUTES
========================= */

/* GET ALL */
router.get("/", authMiddleware, getNotifications);

/* GET BY ID */
router.get("/:id", authMiddleware, validateId, getNotificationById);

/* CREATE */
router.post(
  "/",
  authMiddleware,
  uploadNotification.single("file"), // ✅ already correct
  createNotification
);

/* UPDATE */
router.put(
  "/:id",
  authMiddleware,
  validateId, // ✅ good
  uploadNotification.single("file"),
  updateNotification
);

/* DELETE */
router.delete(
  "/:id",
  authMiddleware,
  validateId, // ✅ good
  deleteNotification
);

export default router;