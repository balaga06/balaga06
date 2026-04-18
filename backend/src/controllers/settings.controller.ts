import { Request, Response } from "express";
import pool from "../config/db";

/* GET SETTINGS */

export const getSettings = async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM settings LIMIT 1");

  res.json(result.rows[0]);
};

/* UPDATE SETTINGS */

export const updateSettings = async (req: Request, res: Response) => {
  const { site_name, contact_email } = req.body;

  const result = await pool.query(
    `UPDATE settings
     SET site_name=$1,
         contact_email=$2
     WHERE id=1
     RETURNING *`,
    [site_name, contact_email]
  );

  res.json(result.rows[0]);
};