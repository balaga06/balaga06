import { Request, Response } from "express";
import pool from "../config/db";

/* =========================
   TYPE (MULTER)
========================= */
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

/* =========================
   HELPERS
========================= */
const toBoolean = (val: any): boolean => {
  return String(val) === "true";
};

const cleanCategory = (category: any): string => {
  if (!category || category.trim() === "") return "general";
  return category.trim().toLowerCase();
};

const getFileUrl = (file?: Express.Multer.File) => {
  return file ? `/uploads/notifications/${file.filename}` : null;
};

/* =========================
   PUBLIC (WEBSITE)
========================= */
export const getPublicNotifications = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let query = `
      SELECT id, title, link, file_url, category, created_at,
             type, programme, branch,
             is_scrolling, is_active   -- ✅ FIXED
      FROM notifications
      WHERE is_active = true
    `;

    const values: any[] = [];

    if (category) {
      query += ` AND LOWER(category) = LOWER($1)`;
      values.push(category);
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (error) {
    console.error("❌ PUBLIC ERROR:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

/* =========================
   ADMIN
========================= */
export const getNotifications = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notifications ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("❌ FETCH ERROR:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

/* =========================
   GET BY ID
========================= */
export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "SELECT * FROM notifications WHERE id=$1",
      [id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("❌ GET BY ID ERROR:", error);
    res.status(500).json({ message: "Failed to fetch notification" });
  }
};

/* =========================
   CREATE
========================= */
export const createNotification = async (req: MulterRequest, res: Response) => {
  try {
    const {
      title,
      link,
      category,
      starts_at,
      ends_at,
      is_scrolling,
      is_active,
      type,
      programme,
      branch,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      `INSERT INTO notifications
       (title, link, file_url, category, starts_at, ends_at,
        is_scrolling, is_active, type, programme, branch)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        title,
        link || null,
        getFileUrl(req.file),
        cleanCategory(category),
        starts_at || null,
        ends_at || null,
        toBoolean(is_scrolling ?? true), // ✅ default true
        toBoolean(is_active ?? true),
        type || null,
        programme || null,
        branch || null,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error: any) {
    console.error("❌ CREATE ERROR:", error);
    res.status(500).json({
      message: "Failed to create notification",
      error: error.message,
    });
  }
};

/* =========================
   UPDATE
========================= */
export const updateNotification = async (req: MulterRequest, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existing = await pool.query(
      "SELECT file_url FROM notifications WHERE id=$1",
      [id]
    );

    if (!existing.rowCount) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const {
      title,
      link,
      category,
      starts_at,
      ends_at,
      is_scrolling,
      is_active,
      type,
      programme,
      branch,
    } = req.body;

    const file_url = req.file
      ? getFileUrl(req.file)
      : existing.rows[0].file_url;

    const result = await pool.query(
      `UPDATE notifications
       SET title=$1,
           link=$2,
           file_url=$3,
           category=$4,
           starts_at=$5,
           ends_at=$6,
           is_scrolling=$7,
           is_active=$8,
           type=$9,
           programme=$10,
           branch=$11
       WHERE id=$12
       RETURNING *`,
      [
        title,
        link || null,
        file_url,
        cleanCategory(category),
        starts_at || null,
        ends_at || null,
        toBoolean(is_scrolling ?? true), // ✅ default true
        toBoolean(is_active ?? true),
        type || null,
        programme || null,
        branch || null,
        id,
      ]
    );

    res.json(result.rows[0]);

  } catch (error: any) {
    console.error("❌ UPDATE ERROR:", error);
    res.status(500).json({
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

/* =========================
   DELETE
========================= */
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await pool.query("DELETE FROM notifications WHERE id=$1", [id]);

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("❌ DELETE ERROR:", error);
    res.status(500).json({ message: "Failed to delete notification" });
  }
};