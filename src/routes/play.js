import { Router } from 'express';
import playController from '../controllers/PlayController';
import verifyToken from '../middleware/auth';
const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', verifyToken, playController.index);
router.post('/', verifyToken, upload.single('image'), playController.savePlay);
// router.delete("/", verifyToken, playController.deletePlay);

export default router;
