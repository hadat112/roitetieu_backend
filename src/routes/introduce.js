import { Router } from 'express';
import introduceController from '../controllers/IntroduceController';

const router = Router();

router.get('/posts', introduceController.index);
router.post('/posts', introduceController.savePost);
router.delete("/posts", introduceController.deletePost);

export default router;
