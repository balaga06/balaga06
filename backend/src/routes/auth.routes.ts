import { Router } from "express";
import { loginAdmin } from "../controllers/auth.controller";

const router = Router();

/* ================= AUTH ROUTES ================= */

router.post("/login", loginAdmin);

export default router;