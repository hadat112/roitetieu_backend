import { Router } from 'express';
import imageController from '../controllers/ImageController';
const router = Router();

router.get('/', imageController.index);

export default router;
