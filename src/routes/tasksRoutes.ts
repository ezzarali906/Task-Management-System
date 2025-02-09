import { Router } from 'express';
import { addtask, gettasks, gettask, updatetask, deletetask } from '../controllers/tasksController';

const router = Router();

router.post('/', addtask);
router.get('/', gettasks);
router.get('/:id', gettask);
router.put('/:id', updatetask);
router.delete('/:id', deletetask);

export default router;
