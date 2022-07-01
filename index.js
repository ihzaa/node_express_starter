require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const uuid = require("uuid").v4;
const FileStore = require('session-file-store')(session);

app.use(
  session({
    genid: (req) => {
      console.log("Inside the session middleware");
      console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// use flash session
// app.use(express.cookieParser("keyboard cat"));
// app.use(express.session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

var expressLayouts = require("express-ejs-layouts");

// use ejs for template engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("assets", express.static(__dirname + "public/assets"));
app.use(expressLayouts);

// ADD ROUTE START
const fs = require("fs");
const rootRoutePath = "./routes";

importRoutes(rootRoutePath);
// ADD ROUTE END

app.listen(process.env.PORT, () => {
  // console.log(app._router.stack);
  console.log("Server running in port: " + process.env.PORT);
  console.log(uuid());
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
