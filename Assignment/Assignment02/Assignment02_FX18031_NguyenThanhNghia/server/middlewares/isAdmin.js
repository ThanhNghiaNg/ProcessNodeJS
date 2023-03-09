const User = require("../models/User");

const isAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const id = authHeader && authHeader.split(" ")[1];
  User.findById(id).then((user) => {
    if (!user) {
      return res.status(401).send({ message: "User is not existed" });
    } else {
      if (user.isAdmin) {
        req.user = user;
        next();
      } else {
        return res.status(401).send({ message: "User is not admin" });
      }
    }
  });
};

module.exports = isAdmin;
