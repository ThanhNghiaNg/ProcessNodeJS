const express = require("express");
const route = express.Router();
const Product = require("../models/Product");

route.get("/", (req, res, next) => {
  Product.fetchAll((data) => {
    console.log(data);
    res.send({ ok: true, products: data });
  });
});

module.exports = route;
