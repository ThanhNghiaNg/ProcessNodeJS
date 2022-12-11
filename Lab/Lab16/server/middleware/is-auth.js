const User = require("../models/User");
module.exports = (req, res, next) => {
  console.log(req.session);
  if (!req.session.isLoggedIn) {
    return res.redirect("/error");
  }
  User.findOne({ username: req.session.user.username }).then((user) => {
    req.session.user = user;
    next();
  });
};


