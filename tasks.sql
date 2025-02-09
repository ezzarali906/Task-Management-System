-- 1. Database Creation
CREATE DATABASE tasks_management;

-- 2. Schema Creation
CREATE SCHEMA task_manager;

-- 3. Table Creation

-- TASKS Table: Stores user tasks with priority, status, and deadline
CREATE TABLE task_manager.tasks (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) CHECK (status IN ('pending', 'in progress', 'completed')) DEFAULT 'pending',
    priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- NOTES Table: Stores user notes linked to tasks (optional)
CREATE TABLE task_manager.notes (
    note_id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES task_manager.tasks(task_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- REMINDERS Table: Stores reminders linked to tasks or independent
CREATE TABLE task_manager.reminders (
    reminder_id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES task_manager.tasks(task_id) ON DELETE CASCADE,
    note_id INTEGER REFERENCES task_manager.notes(note_id) ON DELETE CASCADE,
    reminder_time TIMESTAMP NOT NULL,
    repeat_frequency VARCHAR(50) CHECK (repeat_frequency IN ('none', 'daily', 'weekly', 'monthly')) DEFAULT 'none',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Data Insertion

-- Insert Sample Tasks
INSERT INTO task_manager.tasks (title, description, status, priority, due_date) VALUES
('Complete Project Report', 'Finalize and submit the project report.', 'in progress', 'high', '2025-02-10'),
('Buy Groceries', 'Purchase milk, eggs, and bread.', 'pending', 'medium', '2025-02-08'),
('Read a Book', 'Finish reading "Atomic Habits".', 'pending', 'low', '2025-02-15');

-- Insert Sample Notes
INSERT INTO task_manager.notes (task_id, content) VALUES
(1, 'Gather feedback from the team before submitting the report.'),
(2, 'Check for discounts on milk and eggs.'),
(3, 'Read at least 30 pages daily.');

-- Insert Sample Reminders
INSERT INTO task_manager.reminders (task_id, reminder_time, repeat_frequency) VALUES
(1, '2025-02-09 10:00:00', 'none'),
(2, '2025-02-07 18:00:00', 'weekly'),
(3, '2025-02-14 20:00:00', 'daily');

-- 5. Queries

-- Retrieve all tasks with their status and priority
SELECT task_id, title, status, priority, due_date FROM task_manager.tasks;

-- Retrieve all notes linked to tasks
SELECT n.note_id, t.title AS task_title, n.content, n.created_at
FROM task_manager.notes n
JOIN task_manager.tasks t ON n.task_id = t.task_id;

-- Retrieve all reminders with their associated tasks
SELECT r.reminder_id, t.title AS task_title, r.reminder_time, r.repeat_frequency
FROM task_manager.reminders r
LEFT JOIN task_manager.tasks t ON r.task_id = t.task_id;
