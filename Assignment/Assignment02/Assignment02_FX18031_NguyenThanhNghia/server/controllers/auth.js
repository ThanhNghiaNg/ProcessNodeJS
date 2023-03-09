const User = require("../models/User");

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.find({ email }).then((users) => {
    const user = users[0];
    if (!user) {
      return res
        .status(401)
        .send({ message: "Username or email do not exist!" });
    } else {
      if (password === user.password) {
        return res
          .status(200)
          .send({ message: "Login Successfully!", user: user._id });
      }
      return res.status(401).send({ message: "Wrong password!" });
    }
  });
};

exports.postSignUp = (req, res, next) => {
  const { email, password } = req.body;
  User.find({ email }).then((users) => {
    const user = users[0];
    if (!user) {
      const newUser = new User({
        username: email,
        email,
        password,
        isAdmin: false,
      });
      newUser
        .save()
        .then((result) => {
          return res.status(200).send({ message: "Sign up successfully!" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res
        .status(409)
        .send({ message: "Sign up failed! User email already exist!" });
    }
  });
};

// exports.postLogout = (req, res, next) => {};

