import { Router } from 'express';
import { addreminder, getreminders, getreminder, updatereminder, deletereminder } from '../controllers/remindersController';

const router = Router();

router.post('/', addreminder);
router.get('/', getreminders);
router.get('/:id', getreminder);
router.put('/:id', updatereminder);
router.delete('/:id', deletereminder);

export default router;
