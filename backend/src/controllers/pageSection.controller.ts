import { Request, Response } from "express";
import pool from "../config/db";

/* ================= GET ALL ================= */
export const getAllSections = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT id, page_group, section_key, title, content, is_active, sort_order
       FROM page_sections
       ORDER BY page_group, sort_order`
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET ALL SECTIONS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sections",
    });
  }
};

/* ================= GET BY KEY ================= */
export const getSectionByKey = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;

    const result = await pool.query(
      `SELECT * FROM page_sections 
       WHERE section_key = $1 AND is_active = true`,
      [key]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET SECTION ERROR:", error);
    res.status(500).json({ message: "Failed to fetch section" });
  }
};

/* ================= GET BY GROUP ================= */
export const getSectionsByGroup = async (req: Request, res: Response) => {
  try {
    const { group } = req.params;

    const result = await pool.query(
      `SELECT * FROM page_sections 
       WHERE page_group = $1 AND is_active = true 
       ORDER BY sort_order`,
      [group]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET GROUP SECTIONS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch sections" });
  }
};

/* ================= UPDATE ================= */
export const updateSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, is_active, sort_order } = req.body;

    const result = await pool.query(
      `UPDATE page_sections
       SET title = COALESCE($1, title),
           content = COALESCE($2, content),
           is_active = COALESCE($3, is_active),
           sort_order = COALESCE($4, sort_order),
           updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [
        title || null,
        content || null, // ✅ FIXED (NO JSON.stringify)
        is_active ?? null,
        sort_order ?? null,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("UPDATE SECTION ERROR:", error);
    res.status(500).json({ message: "Failed to update section" });
  }
};

/* ================= CREATE ================= */
export const createSection = async (req: Request, res: Response) => {
  try {
    const {
      page_group,
      section_key,
      title,
      content,
      sort_order,
      is_active,
    } = req.body;

    if (!page_group || !section_key || !title) {
      return res.status(400).json({
        message: "page_group, section_key, and title are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO page_sections 
       (page_group, section_key, title, content, sort_order, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        page_group,
        section_key,
        title,
        content || {}, // ✅ FIXED (NO stringify)
        sort_order || 0,
        is_active !== false,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("CREATE SECTION ERROR:", error);

    if (error.code === "23505") {
      return res.status(400).json({
        message: "Section key already exists for this group",
      });
    }

    res.status(500).json({ message: "Failed to create section" });
  }
};