import { Request, Response } from 'express';
import { query } from '../services/db';
import { note } from '../models';

export const addnote = async (req: Request, res: Response) => {
  const { content, note_id, task_id}: note = req.body;
  try {
    const result = await query(
      "INSERT INTO task_manager.notes(content, note_id, task_id) VALUES ($1, $2, $3) RETURNING *",
      [content, note_id, task_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getnotes = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM task_manager.notes');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getnote = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('SELECT * FROM task_manager.notes WHERE note_id = $1', [id]);
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'note not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updatenote = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { content, note_id, task_id}: note = req.body;
  try {
    const result = await query(
      'UPDATE task_manager.notes SET content = $1, note_id = $2, task_id = $3 RETURNING *',
      [content, note_id, task_id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletenote = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('DELETE FROM task_manager.notes WHERE note_id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}