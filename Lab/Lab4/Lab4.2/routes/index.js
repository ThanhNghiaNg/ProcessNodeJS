const rootDir = require("../utils/path");
const path = require("path");
const express = require("express");
const route = express.Router();

route.use("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "html", "index.html"));
});

module.exports = route;
