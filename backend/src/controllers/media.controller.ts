import { Request, Response } from "express";
import pool from "../config/db";

/* ================= GET ALL ================= */
export const getMedia = async (req: Request, res: Response) => {
  try {
    const { section, category } = req.query;

    let query = "SELECT * FROM media WHERE 1=1";
    const values: any[] = [];

    if (section) {
      values.push(section);
      query += ` AND section = $${values.length}`;
    }

    if (category) {
      values.push(category);
      query += ` AND category = $${values.length}`;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (error) {
    console.error("GET MEDIA ERROR:", error);
    res.status(500).json({ message: "Failed to fetch media" });
  }
};

/* ================= GET ONE ================= */
export const getMediaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM media WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET ONE ERROR:", error);
    res.status(500).json({ message: "Failed to fetch media" });
  }
};

/* ================= CREATE (🔥 FIXED) ================= */
export const createMedia = async (req: Request, res: Response) => {
  try {
    const { caption, section, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const fileType = req.file.mimetype;

    console.log("BODY:", req.body); // debug

    const result = await pool.query(
      `INSERT INTO media (file_url, file_type, caption, section, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        fileUrl,
        fileType,
        caption || null,
        section || null,
        category || null,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error("CREATE MEDIA ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

/* ================= UPDATE ================= */
export const updateMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { caption, section, category } = req.body;

    let fileUrl = null;
    let fileType = null;

    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
      fileType = req.file.mimetype;
    }

    const result = await pool.query(
      `UPDATE media
       SET
         file_url = COALESCE($1, file_url),
         file_type = COALESCE($2, file_type),
         caption = COALESCE($3, caption),
         section = COALESCE($4, section),
         category = COALESCE($5, category)
       WHERE id = $6
       RETURNING *`,
      [
        fileUrl,
        fileType,
        caption,
        section,
        category,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error("UPDATE MEDIA ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================= DELETE ================= */
export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM media WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Media not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE MEDIA ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};