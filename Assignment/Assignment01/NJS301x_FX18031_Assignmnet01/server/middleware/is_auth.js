const UserToken = require("../models/UserTokens");

const isAuth = (req, res, next) => {
  // get token from attribute authorization of headers
  token = req.headers["authorization"];
  // get all token in data file
  const allTokens = UserToken.all();

  if (
    allTokens.some((t) => {
      return t.token === token;
    })
  ) {
    // Continue doing next middleware when token matched 
    next();
  } else {
    // Send error message if do not have user token matched
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = isAuth;
