const { User } = require("../../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const getAccessToken = (payload) => {
  return sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};

module.exports = {
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
      res.redirect("/web/auth/login");
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
      req.flash(
        "error",
        errors.array()[0].param + ": " + errors.array()[0].msg
      );
      return res.redirect("/web/auth/login");
    }

    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      req.flash("error", "Username Doesn't Exist!");
      return res.redirect("/web/auth/login");
    } else {
      bcrypt.compare(password, user.password).then(async (match) => {
        if (!match) {
          req.flash("error", "Wrong Username And Password Combination");
          return res.redirect("/web/auth/login");
        } else {
          req.session.user = {
            id: user.id,
            username: user.username,
          };
          res.json({
            message: "Login Success!",
          });
        }
      });
    }
  },

  logout: async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token)
      return res
        .status(400)
        .json({ error: { message: "refresh token is required" } });

    const user = await User.findOne({
      where: {
        refresh_token,
      },
    });

    if (!user)
      return res
        .status(400)
        .json({ error: { message: "refresh token doesn't exist!" } });

    user.refresh_token = null;
    await user.save();

    res.status(204).json({
      message: "logout successfully!",
    });
  },
};
