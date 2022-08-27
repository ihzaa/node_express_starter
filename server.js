require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

// ADD ROUTE START
const fs = require("fs");
const rootRoutePath = "./routes/api/";
require("./routes/api/index")(app, rootRoutePath);
// ADD ROUTE END

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server running in port: " + process.env.SERVER_PORT);
});

function importRoutes(path, subFolder = false) {
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    if (file.includes(".js")) {
      let name = file.split(".")[0];
      console.log(`${path}/${name}`);
      const importedRoute = require(`${path}/${name}`);
      // if (subFolder) {
      //   app.use(`${path.split("./routes")[1]}/${name}`, importedRoute);
      // } else app.use(`/${name}`, importedRoute);
      app.use(importedRoute);
    } else {
      importRoutes(`${path}/${file}`, true);
    }
  });
}
