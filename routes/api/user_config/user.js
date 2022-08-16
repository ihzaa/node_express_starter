const express = require("express");
const router = express.Router();

const controller = require("../../../controllers/api/UserController");
const { paginate_result } = require("../../../middlewares/paginate_result");
const { User, Role } = require("../../../models/index");
const validator = require("../../../middlewares/validators/api/userValidator");
const { find_or_fail } = require("../../../middlewares/find_or_fail");
const baseRoute = "/api/users";

router.get(
  baseRoute + "/",
  paginate_result(User, {
    order: [["name", "ASC"]],
    attributes: ["id", "name", "username", "email", "createdAt"],
    include: {
      model: Role,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  }),
  controller.index
);

router.post(baseRoute + "/", validator.store, controller.store);

router.get(
  baseRoute + "/:id",
  find_or_fail(User, {
    attributes: ["id", "name", "username", "email", "createdAt"],
    include: {
      model: Role,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  }),
  controller.show
);

router.put(
  baseRoute + "/:id",
  find_or_fail(User),
  validator.update,
  controller.update
);

router.delete(baseRoute + "/:id", find_or_fail(User), controller.destroy);

module.exports = router;
