import { Request, Response } from "express";
import pool from "../config/db";

// GET /api/pages
export const getPages = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pages ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ message: "Failed to fetch pages" });
  }
};

// GET /api/pages/:id
export const getPageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM pages WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).json({ message: "Failed to fetch page" });
  }
};

// GET /api/pages/slug/:slug
export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT * FROM pages WHERE slug = $1 AND status = 'published'",
      [slug]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    res.status(500).json({ message: "Failed to fetch page" });
  }
};

// POST /api/pages
export const createPage = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, status, menu_id } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ message: "Title and slug are required" });
    }

    const result = await pool.query(
      `INSERT INTO pages (title, slug, content, status, menu_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, slug, content || "", status || "draft", menu_id || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating page:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Slug already exists" });
    }
    res.status(500).json({ message: "Failed to create page" });
  }
};

// PUT /api/pages/:id
export const updatePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, slug, content, status, menu_id } = req.body;

    const result = await pool.query(
      `UPDATE pages
       SET title = $1, slug = $2, content = $3, status = $4, menu_id = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, slug, content, status, menu_id, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error("Error updating page:", error);
    if (error.code === "23505") {
      return res.status(400).json({ message: "Slug already exists" });
    }
    res.status(500).json({ message: "Failed to update page" });
  }
};

// DELETE /api/pages/:id
export const deletePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM pages WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ message: "Failed to delete page" });
  }
};
