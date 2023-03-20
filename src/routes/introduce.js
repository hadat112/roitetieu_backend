import { Router } from 'express';
import introduceController from '../controllers/IntroduceController';

const router = Router();

router.get('/', introduceController.index);

export default router;
