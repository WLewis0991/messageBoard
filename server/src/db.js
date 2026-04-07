import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: '../.env' }); // relative to src/

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;