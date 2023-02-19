const isAuth = (req, res, next) => {
  if (!req.body.user) {
    return res.status(401).send({ message: "Invalid" });
  } else {
    next();
  }
};
