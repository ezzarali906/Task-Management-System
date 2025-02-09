import { Request, Response } from 'express';
import { query } from '../services/db';
import { task } from '../models';

export const addtask = async (req: Request, res: Response) => {
  const { title, description,status,priority}: task = req.body;
  try {
    const result = await query(
      'INSERT INTO task_manager.tasks(title, description,status,priority) VALUES ($1, $2, $3 ,$4) RETURNING *',
      [title, description,status,priority]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const gettasks = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM task_manager.tasks');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const gettask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('SELECT * FROM task_manager.tasks WHERE task_id = $1', [id]);
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'task not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updatetask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, description,status,priority}: task = req.body;
  try {
    const result = await query(
      'UPDATE task_manager.tasks SET title = $1, description = $2 , status = $3 , priority = $4 WHERE task_id = $5 RETURNING *',
      [title, description,status,priority,id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletetask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('DELETE FROM task_manager.tasks WHERE task_id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}