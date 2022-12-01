const path = require("path");
const rootDir = require("../utils/path");

const express = require("express");
const route = express.Router();

route.get("/users", (req, res, next) => {
  res.sendFile(path.join(rootDir, "html", "users.html"));
});

module.exports = route;
