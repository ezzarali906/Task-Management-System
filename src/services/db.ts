import { Pool } from 'pg';

// Usually you should store these in environment variables and hardcode them here
// for the sake of simplicity I'm hardcoding them here for now
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_management',
  password: 'aa11ss22dd33',
  port: 5432,
});

// This function will query the database and return the result
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};