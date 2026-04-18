import { Request, Response } from "express";
import {pool} from "../config/db";

/* GET ALL FEEDBACK */

export const getFeedback = async (req: Request, res: Response) => {
  const result = await pool.query(
    "SELECT * FROM feedback ORDER BY created_at DESC"
  );
  res.json(result.rows);
};

/* CREATE FEEDBACK */

export const createFeedback = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  const result = await pool.query(
    `INSERT INTO feedback (name,email,message)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [name, email, message]
  );

  res.status(201).json(result.rows[0]);
};

/* DELETE FEEDBACK */

export const deleteFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;

  await pool.query("DELETE FROM feedback WHERE id=$1", [id]);

  res.json({ message: "Feedback deleted" });
};