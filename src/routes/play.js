import { Router } from "express";
import playController from "../controllers/PlayController";
import verifyToken from "../middleware/auth";
const router = Router();
const multer = require("multer");
const fs = require("fs");
import verifyRole from '../middleware/verifyRole';
import ROLE_LIST from '../config/roleList';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "src/uploads/images";
    console.log(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    console.log("Destination path:", dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer().fields([
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "content",
    maxCount: 1,
  },
  {
    name: "name",
    maxCount: 1,
  },
  {
    name: "slug",
    maxCount: 1,
  },
]);

router.get("/", playController.index);
router.post("/create", verifyToken, verifyRole(ROLE_LIST.admin), upload, playController.savePlay); 
router.post("/update", verifyToken, verifyRole(ROLE_LIST.admin), upload, playController.updatePlay);
router.delete("/delete", verifyToken, verifyRole(ROLE_LIST.admin), playController.deletePlay);
router.get("/detail", playController.detailPlay);

export default router;
