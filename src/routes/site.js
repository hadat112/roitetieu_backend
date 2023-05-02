import { Router } from 'express';
import siteController from '../controllers/SiteController';
import verifyToken from '../middleware/auth';
import verifyRole from '../middleware/verifyRole';
import ROLE_LIST from '../config/roleList';

const router = Router();

router.get("/model/:id", siteController.model);
router.get("/post-detail", siteController.show);
router.get("/questions", verifyToken, verifyRole(ROLE_LIST.admin), siteController.getQuestions);
router.post("/question/create", verifyToken, verifyRole(ROLE_LIST.admin), siteController.createQuestion)
router.delete("/question/delete", verifyToken, verifyRole(ROLE_LIST.admin), siteController.deleteQuestion)
router.post("/question/update", verifyToken, verifyRole(ROLE_LIST.admin), siteController.updateQuestion)
router.get('/user-info', verifyToken, siteController.getUserInfo);
router.get('/history', siteController.getHistory)
router.get('/valuation', siteController.getValuation)
router.get("/users", verifyToken, verifyRole(ROLE_LIST.admin), siteController.getUsers);
router.delete("/user/delete", verifyToken, verifyRole(ROLE_LIST.admin), siteController.deleteUser)
router.post("/user/update", verifyToken, verifyRole(ROLE_LIST.admin), siteController.updateUser)
export default router;
