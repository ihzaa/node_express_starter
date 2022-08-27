const controller = require("../../../controllers/api/PermissionController");
const baseRoute = "/api/permissions";

module.exports = function (app) {
  app.get(baseRoute + "/", controller.index);
};
