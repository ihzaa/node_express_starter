const permissions_helper = require("../../utils/permission_helper");

module.exports = {
  index: async (req, res) => {
    res.json(permissions_helper.get_all_permission());
  },
};
