const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product")

const route = express.Router();

route.get("/users", (req, res, next) => {
  User.find()
    .populate("cart.items.productId")
    .then((users) => {
      return res.send(users);
    });
});
route.get("/category/:id?/:page?", (req, res, next) => {
  const { id, page } = req.params;
  const query = req.query.q;
  const query1 = req.query.q1;
  return res.send({ id, page, query, query1 });
});

module.exports = route;
