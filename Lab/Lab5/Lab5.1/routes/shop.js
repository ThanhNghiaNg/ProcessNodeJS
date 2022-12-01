const rootDir = require("../utils/path");
const path = require("path");
const express = require("express");
const route = express.Router();

const products = [];

route.get("/", (req, res, next) => {
  res.render("shop", { title: "Shop", products: products, path: "/" });
});

exports.Route = route;
exports.Product = products;
