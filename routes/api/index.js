var fs = require("fs");

function importRoute(app, dir_path, sub_dir_path = "") {
  fs.readdirSync(dir_path + sub_dir_path).forEach(function (file) {
    if (file == "index.js") return;
    if (!file.includes(".js")) {
      importRoute(app, `${dir_path}`, `${sub_dir_path}${file}/`);
    } else {
      console.log(sub_dir_path + file);
      require(`./${sub_dir_path}${file}`)(app);
    }
  });
}

module.exports = importRoute;
