import { Router } from 'express';
import siteController from '../controllers/SiteController';
import verifyToken from '../middleware/auth';

const router = Router();

router.get("/model/:id", siteController.model);
router.get("/post-detail", verifyToken, siteController.show);
router.post("/question/create", verifyToken, siteController.createQuestion)
router.get('/user-info', verifyToken, siteController.getUserInfo);
export default router;
