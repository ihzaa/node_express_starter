const express = require("express");
const router = express.Router();
const role_controller = require("../../../controllers/api/role_controller");
const { paginate_result } = require("../../../middlewares/paginate_result");
const { Role } = require("../../../models/index");
const baseRoute = "/api/roles";

router.get(
  baseRoute + "/",
  paginate_result(Role, { order: [["name", "ASC"]] }),
  role_controller.index
);

module.exports = router;
