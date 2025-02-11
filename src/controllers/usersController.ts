import { Request, Response } from 'express';
import { query } from '../services/db';
import { user } from '../models';

export const adduser = async (req: Request, res: Response) => {
  const { email,pass_word,user_role} : user = req.body;
  try {
    const result = await query(
      'INSERT INTO task_manager.users(email, pass_word, user_role) VALUES ($1, $2, $3) RETURNING *,',
      [email,pass_word,user_role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getusers = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM task_manager.users');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getuser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('SELECT * FROM task_manager.users WHERE user_id = $1', [id]);
    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateuser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { email,pass_word,user_role} : user = req.body;
  try {
    const result = await query(
      'UPDATE task_manager.users SET email = $1, pass_word = $2 user_role = $3 WHERE user_id = $4 RETURNING *',
      [email,pass_word,user_role]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteuser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('DELETE FROM task_manager.users WHERE user_id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}