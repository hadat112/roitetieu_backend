import { Router } from "express";
import playController from "../controllers/PlayController";
import verifyToken from "../middleware/auth";
const router = Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "src/uploads/images";

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

const upload = multer({ storage: storage }).fields([
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

router.get("/", verifyToken, playController.index);
router.post("/", upload, playController.savePlay);
// router.delete("/", verifyToken, playController.deletePlay);

export default router;
