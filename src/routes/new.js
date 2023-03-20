import { Router } from 'express';
import newController from '../controllers/NewController';

const router = Router();


router.use('/', newController.index);
 
export default router;
