const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const authValiation = require("../middlewares/validators/auth");
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/register", authValiation.register, authController.register);

router.post("/login", authValiation.login, authController.login);

router.post("/refresh-token", authController.refresh_token);

router.get("/", validateToken, (req, res) => {
  res.json("OK");
});

module.exports = router;
