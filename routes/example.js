// just add some file like this for add route
// you can create a folder, folder name must be unique in a root

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("example");
});

module.exports = router;
