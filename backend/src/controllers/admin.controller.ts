import { Request, Response } from "express";
import pool from "../config/db";

/* ================= GET ALL ADMINS ================= */

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM admins ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get Admins Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ADMIN BY ID ================= */

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT id, name, email FROM admins WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CREATE ADMIN ================= */

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await pool.query(
      `INSERT INTO admins (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE ADMIN ================= */

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await pool.query(
      `UPDATE admins
       SET name=$1, email=$2
       WHERE id=$3
       RETURNING id, name, email`,
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE ADMIN ================= */

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM admins WHERE id=$1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};