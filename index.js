require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// use ejs for template engine
app.set("view engine", "ejs");

// ADD ROUTE START
const fs = require("fs");
const rootRoutePath = "./routes";

importRoutes(rootRoutePath);
// ADD ROUTE END

app.listen(process.env.PORT, () => {
  // console.log(app._router.stack);
  console.log("Server running in port: " + process.env.PORT);
});

function importRoutes(path, subFolder = false) {
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    if (file.includes(".js")) {
      let name = file.split(".")[0];
      const importedRoute = require(`${path}/${name}`);
      if (subFolder) {
        app.use(`${path.split("./routes")[1]}/${name}`, importedRoute);
      } else app.use(`/${name}`, importedRoute);
    } else {
      importRoutes(`${path}/${file}`, true);
    }
  });
}
