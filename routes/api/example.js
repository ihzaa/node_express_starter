// just add some file like this for add route
// you can create a folder

const baseRoute = "/api/example";

module.exports = function (app) {
  app.get(baseRoute + "/", (req, res) => {
    res.json("ini contoh");
  });
};
