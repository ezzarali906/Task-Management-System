import { Request, Response } from 'express';
import { query } from '../services/db';
import { reminder } from '../models';

export const addreminder = async (req: Request, res: Response) => {
  const { reminder_id, task_id, note_id,reminder_time,repeat_frequency} : reminder = req.body;
  try {
    const result = await query(
      'INSERT INTO task_manager.reminders(reminder_id, task_id, note_id, reminder_time, repeat_frequency) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [reminder_id, task_id, note_id,reminder_time,repeat_frequency]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getreminders = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM task_manager.reminders');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getreminder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('SELECT * FROM task_manager.reminders WHERE reminder_id = $1', [id]);
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'reminder not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updatereminder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { reminder_id, task_id, note_id} : reminder = req.body;
  try {
    const result = await query(
      'UPDATE task_manager.reminders SET reminder_id = $1, task_id = $2, note_id = $3 WHERE reminder_id = $4 RETURNING *',
      [reminder_id, task_id, note_id,reminder_id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletereminder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('DELETE FROM task_manager.reminders WHERE reminder_id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}