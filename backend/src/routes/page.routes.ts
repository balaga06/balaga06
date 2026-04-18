import { Router } from "express";
import {
  getPages,
  getPageById,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
} from "../controllers/page.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", getPages);
router.get("/slug/:slug", getPageBySlug);
router.get("/:id", getPageById);

// Protected routes
router.post("/", authMiddleware, createPage);
router.put("/:id", authMiddleware, updatePage);
router.delete("/:id", authMiddleware, deletePage);

export default router;
