import { Router } from 'express';
import { adduser, getusers, getuser, updateuser, deleteuser } from '../controllers/usersController';

const router = Router();

router.post('/', adduser);
router.get('/', getusers);
router.get('/:id', getuser);
router.put('/:id', updateuser);
router.delete('/:id', deleteuser);

export default router;
