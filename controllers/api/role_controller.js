const { Role } = require("../../models");

module.exports = {
  index: async (req, res) => {
    res.json(res.paginatedResult);
  },
};
