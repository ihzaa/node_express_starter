const express = require("express");
const authController = require("../../controllers/api/auth");
const router = express.Router();
const authValiation = require("../../middlewares/validators/api/auth");

const baseRoute = "/api/auth/";
router.post(
  baseRoute + "register",
  authValiation.register,
  authController.register
);

router.post(baseRoute + "login", authValiation.login, authController.login);

router.post(baseRoute + "refresh-token", authController.refresh_token);

router.delete(baseRoute + "/logout", authController.logout);

module.exports = router;
