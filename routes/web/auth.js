const express = require("express");
const router = express.Router();
const authValidator = require("../../middlewares/validators/web/auth");
const authController = require("../../controllers/web/auth");
const { guest, auth } = require("../../middlewares/authenticationMiddleware");

const baseRoute = "/auth/";
router.get(baseRoute + "login", guest, (req, res) => {
  res.render("auth/login", { layout: "layouts/blank" });
});

router.post(baseRoute + "login", guest);
router.post(baseRoute + "login", authValidator.login, authController.login);

router.get(baseRoute + "check", auth, (req, res) => {
  res.json(req.session);
});

module.exports = router;
