import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/db";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN:", email, password);

    // 🔍 Find admin by email
    const result = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    // ❌ Email not found
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const admin = result.rows[0];

    console.log("DB USER:", admin);

    // ✅ IMPORTANT FIX: use password_hash (matches your DB)
    if (admin.password_hash !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ❌ Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing!");
      return res.status(500).json({ message: "JWT config error" });
    }

    // 🔐 Generate token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Success response
    return res.json({
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};