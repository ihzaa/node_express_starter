const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/PermissionController");
const baseRoute = "/api/permissions";

router.get(baseRoute + "/", controller.index);

module.exports = router;
