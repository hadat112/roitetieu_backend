const express = require("express");
const router = express.Router();

const introduceController = require("../app/controllers/IntroduceController");

router.get("/", introduceController.index);
router.post('/post', introduceController.store);
module.exports = router;
