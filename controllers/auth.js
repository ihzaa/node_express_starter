const { User } = require("../models/");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const getAccessToken = (payload) => {
  return sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};

module.exports = {
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
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
      return res.status(400).json({ errors: errors.array()[0] });
    }

    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(400).json({
        error: {
          value: username,
          message: "Username Doesn't Exist!",
        },
      });
    } else {
      bcrypt.compare(password, user.password).then(async (match) => {
        if (!match)
          res.status(400).json({
            error: {
              error: {
                value: username,
                message: "Wrong Username And Password Combination",
              },
            },
          });
        else {
          const accessToken = getAccessToken({
            username: user.username,
            id: user.id,
          });

          const refreshToken = sign(
            { username: user.username, id: user.id },
            process.env.JWT_REFRESH_TOKEN_SECRET
          );

          user.refresh_token = refreshToken;
          await user.save();

          res.json({
            access_token: accessToken,
            refresh_token: refreshToken,
            username: username,
            message: "Login Success!",
          });
        }
      });
    }
  },

  refresh_token: async (req, res) => {
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

    verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, data) => {
      if (err)
        return res.status(400).json({
          error: err,
        });

      const { username, id } = data;
      const accessToken = getAccessToken({ username, id });

      res.json({ access_token: accessToken });
    });
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
