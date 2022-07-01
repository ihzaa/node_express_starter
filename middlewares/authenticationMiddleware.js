const guest = (req, res, next) => {
  if (req.session.user != undefined) {
    res.json("you are already logged in!");
  }
  next();
};

const auth = (req, res, next) => {
  if (req.session.user == undefined) {
    req.flash("alert", "1");
    req.flash("alert_class", "danger");
    req.flash("alert_icon", "times");
    req.flash("alert_title", "Error");
    req.flash(
      "alert_message",
      "Silahkan login terlebih dahulu untuk mengakses halaman!"
    );

    return res.redirect("/web/auth/login");
  }
  next();
};

module.exports = { guest, auth };
