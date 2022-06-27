const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("x-access-token");

  if (!accessToken)
    return res.status(400).json({ errors: { message: "User Not Logged In!" } });

  try {
    const validToken = verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (validToken) {
      req.user = validToken;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ errors: err });
  }
};

module.exports = { validateToken };
