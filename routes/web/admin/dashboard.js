const express = require("express");
const router = express.Router();
const { auth } = require("../../../middlewares/authenticationMiddleware");

router.get("/", auth, (req, res) => {
  res.render("admin/dashboard", { layout: "layouts/master" });
});

module.exports = router;
