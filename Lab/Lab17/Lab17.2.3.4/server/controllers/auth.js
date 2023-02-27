const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator/check");

exports.postRegister = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).send({ Message: `${errors.array()[0].msg}` });
  }
  return bcrypt
    .hash(password, 12)
    .then((passwordHash) => {
      const newUser = new User({
        email,
        password: passwordHash,
        cart: { items: [] },
      });
      return newUser.save();
    })
    .then((result) => {
      return res.status(200).send({ Message: "Register Successfully" });
    });
};

exports.postlogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(401).send({ Message: `${errors.array()[0].msg}` });
  }
  User.findOne({ email: email }).then((user) => {
    return bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
          console.log(err);
          return res.status(200).send({
            Message: "Login Successfully!",
            token: req.session.user._id,
          });
        });
      } else {
        return res.status(401).send({ Message: "Login Fail! Wrong Password!" });
      }
    });
  })
  
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
