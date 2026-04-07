import pool from './db.js';

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB connected:", result.rows[0]);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();