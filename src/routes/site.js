import { Router } from 'express';
import siteController from '../controllers/SiteController';
import verifyToken from '../middleware/auth';

const router = Router();

router.get("/model/:id", siteController.model);
router.get("/:slug", siteController.show);
router.delete("/:id", siteController.destroy);
router.get('/search', siteController.search);
router.get('/play', siteController.play);
router.post('/play', siteController.store);
router.get('/', verifyToken, siteController.index);
 
export default router;
