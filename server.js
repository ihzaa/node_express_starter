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

