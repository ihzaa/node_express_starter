// just add some file like this for add route
// you can create a folder

const express = require("express");
const router = express.Router();
const baseRoute = "example";
router.get(baseRoute + "/", (req, res) => {
  res.json({
    message: "testing ok",
  });
});

module.exports = router;
