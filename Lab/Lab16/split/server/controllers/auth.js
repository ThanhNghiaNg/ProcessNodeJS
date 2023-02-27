const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.postRegister = (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      bcrypt
        .hash(password, 12)
        .then((passwordHash) => {
          const newUser = new User({
            username: username,
            password: passwordHash,
            cart: { items: [] },
          });
          return newUser.save();
        })
        .then((result) => {
          return res.status(200).send({ Message: "Register Successfully" });
        });
    } else {
      return res.status(401).send({ Message: "Username already exists!" });
    }
  });
  console.log(req.session);
};

exports.postlogin = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.status(401).send({ Message: "Username is not registered!" });
    } else {
      bcrypt.compare(password, user.password).then((matched) => {
        if (matched) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save((err) => {
            console.log(err);
            return res.status(200).send({ Message: "Login Successfully!" });
          });
        } else {
          return res
            .status(401)
            .send({ Message: "Login Fail! Wrong Password!" });
        }
      });
    }
  });
};

exports.postLogout = (req, res, next) => {
  console.log(req);
  req.session.destroy((err) => {
    if (!err) {
      return res.status(200).send({ message: "Successfully Logout!" });
    } else {
      console.log(err);
      return res.status(403).send({ message: "Logout Error" });
    }
  });
};
