import { Router } from 'express';
import introduceController from '../controllers/IntroduceController';
import verifyToken from '../middleware/auth';

const router = Router();

router.get('/posts', verifyToken, introduceController.index);
router.get('/search', verifyToken, introduceController.search);
router.post('/posts', verifyToken, introduceController.savePost);
router.delete("/posts", verifyToken, introduceController.deletePost);
router.post('/comment', verifyToken, introduceController.saveComment);

export default router;
