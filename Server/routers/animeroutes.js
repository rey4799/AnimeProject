const express = require("express");
const Controller = require("../controllers/controller.js");
const { authentication } = require("../middleware/authentication.js");
const router = express.Router();

router.use(authentication)

router.get("/", Controller.getAllAnime);
router.get("/:id", Controller.getAnimeById);

module.exports = router;
