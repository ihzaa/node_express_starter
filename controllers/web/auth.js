const { User } = require("../../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const flash_message_helper = require("../../utils/flash_message_helper");

const getAccessToken = (payload) => {
  return sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};

module.exports = {
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req = flash_message_helper.alert(req, {
        class: "danger",
        icon: "times",
        title: "Error",
        message: errors.array()[0].param + ": " + errors.array()[0].msg,
      });
      res.redirect(process.env.BASE_URL + "/auth/login");
    }

    const { name, username, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    let data = {
      name,
      username,
      email,
      password,
    };

    await User.create(data);

    res.status(200).json({
      message: "Registration Success",
    });
  },

  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req = flash_message_helper.alert(req, {
        class: "danger",
        icon: "times",
        title: "Error",
        message: errors.array()[0].param + ": " + errors.array()[0].msg,
      });
      return res.redirect(process.env.BASE_URL + "/auth/login");
    }

    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      req = flash_message_helper.alert(req, {
        class: "danger",
        icon: "times",
        title: "Error",
        message: "Username Doesn't Exist!",
      });
      return res.redirect(process.env.BASE_URL + "/auth/login");
    } else {
      bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) {
          req = flash_message_helper.alert(req, {
            class: "danger",
            icon: "times",
            title: "Error",
            message: "Wrong Username And Password Combination",
          });
          return res.redirect(process.env.BASE_URL + "/auth/login");
        } else {
          req.session.user = {
            id: user.id,
            username: user.username,
          };
          return res.redirect(process.env.BASE_URL + "/admin/dashboard");
        }
      });
    }
  },
};
