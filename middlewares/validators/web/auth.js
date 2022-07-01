const { body } = require("express-validator");
const { User } = require("../../../models");

module.exports = {
  login: [
    body("username").isLength({ min: 1 }),
    body("password").isLength({ min: 1 }),
  ],
};
