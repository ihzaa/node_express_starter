const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const authValiation = require("../middlewares/validators/auth");

router.post("/register", authValiation.register, authController.register);

router.post("/login", authValiation.login, authController.login);

module.exports = router;
