const express = require("express");
const router = express.Router();
const RoleController = require("../../../controllers/api/RoleController");
const { paginate_result } = require("../../../middlewares/paginate_result");
const { Role } = require("../../../models/index");
const RoleValidation = require("../../../middlewares/validators/api/roleValidator");
const { find_or_fail } = require("../../../middlewares/find_or_fail");
const baseRoute = "/api/roles";

router.get(
  baseRoute + "/",
  paginate_result(Role, { order: [["name", "ASC"]] }),
  RoleController.index
);
router.post(baseRoute + "/", RoleValidation.store, RoleController.store);

router.get(baseRoute + "/:id", find_or_fail(Role), RoleController.show);

router.put(
  baseRoute + "/:id",
  find_or_fail(Role),
  RoleValidation.update,
  RoleController.update
);

router.delete(baseRoute + "/:id", find_or_fail(Role), RoleController.destroy);

module.exports = router;
