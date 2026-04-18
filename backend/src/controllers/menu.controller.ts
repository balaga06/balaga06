import { Request, Response } from "express";
import pool from "../config/db";

/**
 * GET /api/menus
 */
export const getMenus = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM menus ORDER BY position ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET MENUS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch menus" });
  }
};

/**
 * POST /api/menus
 */
export const createMenu = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body);

    let { name, slug, type, link, position, is_active } = req.body;

    // ✅ sanitize slug
    slug = slug?.replace("/", "");

    // ✅ DEFAULT TYPE
    type = type || "page";

    // ✅ validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (type !== "external" && !slug) {
      return res.status(400).json({ message: "Slug required" });
    }

    if (type === "external" && !link) {
      return res.status(400).json({ message: "Link required" });
    }

    position = Number(position);

    const result = await pool.query(
      `INSERT INTO menus (name, slug, type, link, position, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        type === "external" ? "" : slug,
        type,                         // ✅ FIXED
        type === "external" ? link : "",
        position || 0,
        is_active ?? true,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("CREATE MENU ERROR:", err);

    res.status(500).json({
      message: "Failed to create menu",
      error: err.message,
    });
  }
};

/**
 * PUT /api/menus/:id
 */
export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let { name, slug, type, link, position, is_active } = req.body;

    slug = slug?.replace("/", "");
    type = type || "page";
    position = Number(position);

    const result = await pool.query(
      `UPDATE menus
       SET name=$1,
           slug=$2,
           type=$3,     -- ✅ FIXED
           link=$4,     -- ✅ FIXED
           position=$5,
           is_active=$6
       WHERE id=$7
       RETURNING *`,
      [
        name,
        type === "external" ? "" : slug,
        type,
        type === "external" ? link : "",
        position,
        is_active,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE MENU ERROR:", err);
    res.status(500).json({ message: "Failed to update menu" });
  }
};

/**
 * DELETE /api/menus/:id
 */
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM menus WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json({ message: "Menu deleted successfully" });
  } catch (err) {
    console.error("DELETE MENU ERROR:", err);
    res.status(500).json({ message: "Failed to delete menu" });
  }
};