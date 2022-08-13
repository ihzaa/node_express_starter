const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/PermissionController");
const baseRoute = "/api/permissions";

router.get(baseRoute + "/", controller.index);

// router.post(baseRoute + "/", validator.store, controller.store);

// router.get(baseRoute + "/:id", find_or_fail(Role), controller.show);

// router.put(
//   baseRoute + "/:id",
//   find_or_fail(Role),
//   validator.update,
//   controller.update
// );

// router.delete(baseRoute + "/:id", find_or_fail(Role), controller.destroy);

module.exports = router;
