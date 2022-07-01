const express = require("express");
const router = express.Router();
const authValidator = require("../../middlewares/validators/web/auth");
const authController = require("../../controllers/web/auth");
const { guest, auth } = require("../../middlewares/authenticationMiddleware");

router.get("/login", guest, (req, res) => {
  res.render("auth/login", { layout: "layouts/blank" });
});

router.post("/login", guest);
router.post("/login", authValidator.login, authController.login);

router.get("/check", auth, (req, res) => {
  res.json(req.session);
});

module.exports = router;
