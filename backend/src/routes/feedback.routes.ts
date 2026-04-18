import { Router } from "express";
import {
  getFeedback,
  createFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

/* ================= FEEDBACK ROUTES ================= */

router.get("/", authMiddleware, getFeedback);

router.post("/", createFeedback);

router.delete("/:id", authMiddleware, deleteFeedback);

export default router;