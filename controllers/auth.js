const { User } = require("../models/");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      return res.status(400).json({ errors: errors.array() });
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
          msg: "Username Doesn't Exist!",
        },
      });
    } else {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match)
          res.status(400).json({
            error: {
              error: {
                value: username,
                msg: "Wrong Username And Password Combination",
              },
            },
          });
        else {
          const accessToken = sign(
            { username: user.username, id: user.id },
            process.env.JWT_SECRET,
            {
              expiresIn: 60,
            }
          );

          res.json({
            token: accessToken,
            username: username,
            msg: "Login Success!",
          });
        }
      });
    }
  },
};
