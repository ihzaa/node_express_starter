const express = require("express");
const authController = require("../../controllers/api/auth");
const router = express.Router();
const authValiation = require("../../middlewares/validators/auth");

router.post("/register", authValiation.register, authController.register);

router.post("/login", authValiation.login, authController.login);

router.post("/refresh-token", authController.refresh_token);

router.delete("/logout", authController.logout);

module.exports = router;
