const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/search", siteController.search);
router.get("/model/:id", siteController.model);
router.get("/", siteController.index);
router.get("/:slug", siteController.show);
router.get("/play", siteController.play);
router.post("/play", siteController.store);
router.delete("/:id", siteController.destroy);

module.exports = router;
