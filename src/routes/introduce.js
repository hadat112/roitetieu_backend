import { Router } from 'express';
import introduceController from '../controllers/IntroduceController';
import verifyToken from '../middleware/auth';

const router = Router();

router.get('/posts', verifyToken, introduceController.index);
router.get('/search', verifyToken, introduceController.search);
router.post('/posts/create', verifyToken, introduceController.savePost);
router.delete("/posts/delete", verifyToken, introduceController.deletePost);
router.post("/posts/update", verifyToken, introduceController.updatePost);
router.post('/comment', verifyToken, introduceController.saveComment);

export default router;
