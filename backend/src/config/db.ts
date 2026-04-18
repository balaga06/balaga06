import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/* ================= DATABASE CONNECTION ================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // 🔥 required for Neon
  },
});

/* ================= TEST CONNECTION ================= */

pool.connect()
  .then(async (client) => {
    console.log("\n===================================");
    console.log("✅ Neon PostgreSQL Connected");
    console.log("===================================\n");

    // 🔥 DEBUG: CHECK DATA
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