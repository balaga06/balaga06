import { Request, Response } from "express";
import pool from "../config/db";

/* ================= SAFE COUNT FUNCTION ================= */

const safeCount = async (table: string) => {
  try {
    const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
    return parseInt(result.rows[0]?.count || "0");
  } catch (err) {
    console.warn(`⚠️ Table "${table}" not found`);
    return 0;
  }
};

/* ================= DASHBOARD ================= */

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // ✅ SAFE COUNTS (NO CRASH)
    const admins = await safeCount("admins");
    const pages = await safeCount("pages");
    const activities = await safeCount("activities");
    const notifications = await safeCount("notifications");

    // 📢 Academic Updates (SAFE)
    let academicUpdates: any[] = [];
    try {
      const updatesRes = await pool.query(
        `SELECT id, title, created_at 
         FROM notifications 
         WHERE type = 'academic'
         ORDER BY created_at DESC 
         LIMIT 5`
      );
      academicUpdates = updatesRes.rows;
    } catch {
      console.warn("⚠️ notifications table missing or no 'type' column");
    }

    // 📅 Upcoming Events (SAFE)
    let events: any[] = [];
    try {
      const eventsRes = await pool.query(
        `SELECT id, title, event_date 
         FROM events 
         WHERE event_date >= CURRENT_DATE
         ORDER BY event_date ASC 
         LIMIT 5`
      );
      events = eventsRes.rows;
    } catch {
      console.warn("⚠️ events table missing");
    }

    // ✅ FINAL RESPONSE (ALWAYS SAFE)
    res.json({
      counts: {
        admins,
        pages,
        activities,
        notifications,
      },
      academicUpdates,
      events,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    // 🔥 NEVER BREAK FRONTEND
    res.json({
      counts: {
        admins: 0,
        pages: 0,
        activities: 0,
        notifications: 0,
      },
      academicUpdates: [],
      events: [],
    });
  }
};