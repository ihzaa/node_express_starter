require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// ADD ROUTE START
const fs = require("fs");
const routePath = "./routes";
const files = fs.readdirSync(routePath);

files.forEach((file) => {
  let name = file.split(".")[0];
  const importedRoute = require(`${routePath}/${name}`);
  app.use(`/${name}`, importedRoute);
});
// ADD ROUTE END

app.listen(process.env.PORT, () => {
  console.log("Server running in port: " + process.env.PORT);
});
