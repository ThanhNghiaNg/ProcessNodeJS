const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const users = [];

const app = express();
app.use(cors());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/add-user", (req, res, next) => {
  const user = req.body.user;
  users.push(user);
  res.send({ user: user, ok: true });
});

app.get("/users", (req, res, next) => {
  res.send({ users: users, ok: true });
});

app.listen(5000);
