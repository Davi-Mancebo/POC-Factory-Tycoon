import { Router } from 'express';
import { craeteNewSavePoint, getUser, updateUser } from '../controllers/userController';

const router = Router();

router.post('/save-point', craeteNewSavePoint);
router.get('/user/:token', getUser);
router.put('/user/:token', updateUser);

export default router;