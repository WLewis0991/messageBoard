import { Router, Request, Response } from 'express';
import pool from '../db';
import { Message, CreateMessagesBody } from '../types';

const router = Router();

// GET all messages
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query<Message>(
      'SELECT * FROM messages ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST a new message
router.post('/', async (req: Request<{}, {}, CreateMessagesBody>, res: Response) => {
  const { name, message } = req.body;

  if (!name || !message) {
    res.status(400).json({ error: 'name and message are required' });
    return;
  }

  try {
    const result = await pool.query<Message>(
      'INSERT INTO messages (name, message, likes) VALUES ($1, $2, $3) RETURNING *',
      [name, message, 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

export default router;