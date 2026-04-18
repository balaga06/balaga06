import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/* ================= DATABASE CONNECTION ================= */

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "jntuk",
  database: process.env.DB_NAME || "admin_db",
});

/* ================= TEST CONNECTION ================= */

pool.connect()
  .then(async (client) => {
    console.log("\n===================================");
    console.log("✅ PostgreSQL Database Connected");
    console.log("===================================");
    console.log(`Host      : ${process.env.DB_HOST}`);
    console.log(`Database  : ${process.env.DB_NAME}`);
    console.log(`User      : ${process.env.DB_USER}`);
    console.log("===================================\n");

    // 🔥 DEBUG: CHECK DATA (VERY IMPORTANT)
    const result = await client.query("SELECT * FROM admins");
    console.log("👉 ADMINS IN DB:", result.rows.length);

    client.release();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

/* ================= CONNECTION ERROR ================= */

pool.on("error", (err: Error) => {
  console.error("❌ PostgreSQL connection error:", err.message);
});

export default pool;