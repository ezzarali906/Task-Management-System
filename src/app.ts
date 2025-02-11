import express from 'express';
import notesRoutes from './routes/notesRoutes';
import tasksRoutes from './routes/tasksRoutes';
import remindersRoutes from './routes/remindersRoutes';
import usersRoutes from './routes/usersRoutes';

const app = express();

app.use(express.json());

// Set up the routes for each endpoint.

app.use('/notes', notesRoutes);
app.use('/tasks', tasksRoutes);
app.use('/reminders', remindersRoutes);
app.use('/users', usersRoutes);

export default app;