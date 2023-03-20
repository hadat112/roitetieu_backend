import { Router } from 'express';
import siteController from '../controllers/SiteController';
import verifyToken from '../middleware/auth';

const router = Router();

router.get('/search', siteController.search);
// router.get('/:slug', siteController.show);
router.get('/play', siteController.play);
router.post('/play', siteController.store);
router.get('/', verifyToken, siteController.index);
 
export default router;