const express = require("express");
const app = express();

app.use("/users", (req, res, next) => {
  res.send("<p>The Middleware that handles just /users</p>");
  // next(); Để dùng middleware tiếp theo phải có hàm next()
});

app.use("/", (req, res, next) => {
  res.send("<p>The Middleware that handles just /</p>");
});

app.listen(3001);
