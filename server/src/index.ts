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
    console.log("Sending messages to frontend:", result.rows); // debug
    res.json(result.rows);
  } catch (err) {
    console.error("DB query error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});