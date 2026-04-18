import { Request, Response } from "express";
import pool from "../config/db";

/* ================= GET ================= */
export const getProgrammes = async (req: Request, res: Response) => {
  try {
    const type = req.query.type?.toString().trim();

    let query = "SELECT * FROM programmes";
    let values: any[] = [];

    if (type) {
      query += " WHERE LOWER(type) = LOWER($1)";
      values.push(type);
    }

    query += " ORDER BY order_index ASC";

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* ================= CREATE ================= */
export const createProgramme = async (req: Request, res: Response) => {
  try {
    const {
      name,
      degree,
      duration,
      department,
      branch_code,
      type,
      is_active,
    } = req.body;

    const fixedType = type?.toString().trim().toUpperCase();

    const active =
      is_active === true || is_active === "true"; // ✅ FIXED

    const result = await pool.query(
      `INSERT INTO programmes 
      (name, degree, duration, department, branch_code, type, is_active, order_index)
      VALUES ($1,$2,$3,$4,$5,$6,$7,0)
      RETURNING *`,
      [
        name,
        degree,
        duration,
        department,
        branch_code,
        fixedType,
        active,
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Create failed" });
  }
};

/* ================= UPDATE ================= */
export const updateProgramme = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      name,
      degree,
      duration,
      department,
      branch_code,
      is_active,
    } = req.body;

    const active =
      is_active === true || is_active === "true"; // ✅ FIXED

    const result = await pool.query(
      `UPDATE programmes SET 
        name=$1,
        degree=$2,
        duration=$3,
        department=$4,
        branch_code=$5,
        is_active=$6
      WHERE id=$7 
      RETURNING *`,
      [
        name,
        degree,
        duration,
        department,
        branch_code,
        active,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================= DELETE ================= */
export const deleteProgramme = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM programmes WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

/* ================= REORDER ================= */
export const reorderProgrammes = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    for (const item of items) {
      await pool.query(
        "UPDATE programmes SET order_index=$1 WHERE id=$2",
        [item.order_index, item.id]
      );
    }

    res.json({ message: "Reordered successfully" });

  } catch (err) {
    console.error("REORDER ERROR:", err);
    res.status(500).json({ message: "Reorder failed" });
  }
};

/* ================= PUBLIC ================= */
export const getProgrammesPublic = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM programmes 
       WHERE is_active = true   -- ✅ FIXED
       ORDER BY order_index ASC`
    );

    res.json(result.rows);

  } catch (err) {
    console.error("PUBLIC ERROR:", err);
    res.status(500).json({ message: "Fetch failed" });
  }
};