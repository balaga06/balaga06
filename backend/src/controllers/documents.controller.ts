import { Request, Response } from "express";
import { pool } from "../config/db";

/* ================= GET ALL DOCUMENTS (ADMIN) ================= */
export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM documents ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET ALL ERROR:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

/* ================= GET DOCUMENTS BY TYPE (WEBSITE) ================= */
export const getDocumentsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    const result = await pool.query(
      `SELECT * FROM documents
       WHERE type = $1 AND status='active'
       ORDER BY created_at DESC`,
      [type]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET TYPE ERROR:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

/* ================= CREATE DOCUMENT (ADMIN) ================= */
export const createDocument = async (req: Request, res: Response) => {
  try {
    const { title, type, status } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const file_url = `http://localhost:5000/uploads/${req.file.filename}`;

    const result = await pool.query(
      `INSERT INTO documents (title, type, file_url, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, type, file_url, status || "active"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ error: "Failed to create document" });
  }
};

/* ================= DELETE DOCUMENT ================= */
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM documents WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ error: "Failed to delete document" });
  }
};

/* ================= UPDATE DOCUMENT STATUS ================= */
export const updateDocumentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE documents SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
};