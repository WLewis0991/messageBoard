import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: '../.env' }); // make sure path points to your .env

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function test() {
  try {
    const res = await pool.query("SELECT * FROM messages;");
    console.log("DB query result:", res.rows);
    process.exit(0);
  } catch (err) {
    console.error("DB connection/query failed:", err);
    process.exit(1);
  }
}

test();