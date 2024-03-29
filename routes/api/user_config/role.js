const RoleController = require("../../../controllers/api/RoleController");
const { paginate_result } = require("../../../middlewares/paginate_result");
const { Role } = require("../../../models/index");
const RoleValidation = require("../../../middlewares/validators/api/roleValidator");
const { find_or_fail } = require("../../../middlewares/find_or_fail");
const baseRoute = "/api/roles";
const { validateToken } = require("../../../middlewares/JWTAuthMiddleware");
const {
  permissionMiddleware,
} = require("../../../middlewares/permissionMiddleware");

const permission = "user_config_role";

module.exports = function (app) {
  app.get(
    baseRoute + "/",
    validateToken,
    permissionMiddleware(`view ${permission}`),
    paginate_result(Role, { order: [["name", "ASC"]] }),
    RoleController.index
  );
  app.post(
    baseRoute + "/",
    validateToken,
    permissionMiddleware(`create ${permission}`),
    RoleValidation.store,
    RoleController.store
  );

  app.get(
    baseRoute + "/:id",
    validateToken,
    permissionMiddleware(`view ${permission}`),
    find_or_fail(Role),
    RoleController.show
  );

  app.put(
    baseRoute + "/:id",
    validateToken,
    permissionMiddleware(`update ${permission}`),
    find_or_fail(Role),
    RoleValidation.update,
    RoleController.update
  );

  app.delete(
    baseRoute + "/:id",
    validateToken,
    permissionMiddleware(`delete ${permission}`),
    find_or_fail(Role),
    RoleController.destroy
  );

  app.get(
    baseRoute + "/:id/permissions",
    validateToken,
    permissionMiddleware(`view ${permission}`),
    find_or_fail(Role),
    RoleController.getPermission
  );

  app.post(
    baseRoute + "/:id/permissions",
    validateToken,
    permissionMiddleware(`create ${permission}`),
    find_or_fail(Role),
    RoleController.storePermission
  );
};
