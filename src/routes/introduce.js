import { Router } from 'express';
import introduceController from '../controllers/IntroduceController';
import verifyToken from '../middleware/auth';
import verifyRole from '../middleware/verifyRole';
import ROLE_LIST from '../config/roleList';
const router = Router();

router.get('/posts', introduceController.index);
router.get('/search', introduceController.search);
router.post('/posts/create', verifyToken, verifyRole(ROLE_LIST.admin), introduceController.savePost);
router.delete("/posts/delete", verifyToken, verifyRole(ROLE_LIST.admin), introduceController.deletePost);
router.post("/posts/update", verifyToken, verifyRole(ROLE_LIST.admin), introduceController.updatePost);
router.post('/comment', verifyToken, introduceController.saveComment);
router.delete('/comment/delete', verifyToken, introduceController.deleteComment);

export default router;
