import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from './db.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(result.rows); // must be an array
  } catch (err) {
    console.error("DB query error:", err);
    res.json([]); // return empty array so React doesn’t crash
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});