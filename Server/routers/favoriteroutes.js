const express = require("express");
const Controller = require("../controllers/controller.js");
const { authentication } = require("../middleware/authentication.js");
const router = express.Router();


router.use(authentication);

router.get("/", Controller.getAllFavorite);
router.post("/", Controller.createFavorite);
router.delete("/:id", Controller.deleteFavorite);

module.exports = router;
