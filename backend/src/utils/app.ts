import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";

/* ================= IMPORT ROUTES ================= */

import authRoutes from "../routes/auth.routes";
import adminRoutes from "../routes/admin.routes";
import dashboardRoutes from "../routes/dashboard.routes";

import menuRoutes from "../routes/menu.routes";
import pageRoutes from "../routes/page.routes";
import mediaRoutes from "../routes/media.routes";
import notificationRoutes from "../routes/notification.routes";

import feedbackRoutes from "../routes/feedback.routes";
import programmeRoutes from "../routes/programmes.routes";
import settingsRoutes from "../routes/settings.routes";
import pageSectionRoutes from "../routes/pageSection.routes"; // ✅ ADDED

/* ================= CREATE EXPRESS APP ================= */

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../../uploads"))
);

/* ================= ROOT ================= */

app.get("/", (_req: Request, res: Response) => {
  res.send("IQAC Backend Running 🚀");
});

/* ================= API ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/menus", menuRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/page-sections", pageSectionRoutes); // ✅ ADDED HERE

app.use("/api/media", mediaRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("/api/feedback", feedbackRoutes);
app.use("/api/programmes", programmeRoutes);
app.use("/api/settings", settingsRoutes);

/* ================= ERROR HANDLER ================= */

app.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("GLOBAL ERROR:", err);

    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  }
);

/* ================= 404 ================= */

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/* ================= EXPORT ================= */

export default app;