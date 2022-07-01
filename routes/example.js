// just add some file like this for add route
// you can create a folder, folder name must be unique in a root
// route path is consider of the foler name and file name. Example:
// there is a route call auth.js inside routes/api/
// + routes
//   + api
//     - auth.js
// so the route path is IP:PORT/api/auth/xxxx

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "testing ok",
  });
});

module.exports = router;
