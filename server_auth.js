require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const authController = require("./controllers/api/auth");
const authValiation = require("./middlewares/validators/api/auth");

const baseRoute = "/api/auth/";

app.post(
  baseRoute + "register",
  authValiation.register,
  authController.register
);

app.post(baseRoute + "login", authValiation.login, authController.login);

app.post(baseRoute + "refresh-token", authController.refresh_token);

app.delete(baseRoute + "/logout", authController.logout);

app.listen(process.env.SERVER_AUTH_PORT, () => {
  console.log("Auth server running in port: " + process.env.SERVER_AUTH_PORT);
});
