import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});