const express = require("express");
const Controller = require("../controllers/controller.js");
const { authentication } = require("../middleware/authentication.js");
const router = express.Router();
const multer = require("multer");
const { subscriberOnly } = require("../middleware/authorization.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/pub/animes", Controller.getAllAnime);
router.get("/pub/animes/:id", Controller.getAnimeById);

router.post("/login", Controller.postlogin);
router.post("/google-login", Controller.googleLogin);
router.post("/register", Controller.addUser);
router.put(
  "/edit",
  authentication,
  upload.single("avaUrl"),
  Controller.updateUser
);
router.post(
  "/generate-midtrans-token",
  authentication,
  Controller.generateMidtransToken
);
router.patch("/subscription", authentication, Controller.subscription);
router.post(
  "/ai",
  authentication,
  subscriberOnly,
  upload.single("imageGuess"),
  Controller.ai
);

router.use("/favorites", require("./favoriteroutes.js"));
router.use("/animes", require("./animeroutes.js"));

module.exports = router;
