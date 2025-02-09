import { Router } from 'express';
import { addnote, getnotes, getnote, updatenote, deletenote } from '../controllers/notesController';

const router = Router();

router.post('/', addnote);
router.get('/', getnotes);
router.get('/:id', getnote);
router.put('/:id', updatenote);
router.delete('/:id', deletenote);

export default router;
