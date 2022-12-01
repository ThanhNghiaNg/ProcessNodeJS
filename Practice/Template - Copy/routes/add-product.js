const path = require("path");
const rootDir = require("../utils/path");
const shopData = require("./shop");

const express = require("express");
const route = express.Router();

route.get("/add-product", (req, res, next) => {
  // res.render("add-product", { title: "Add product", path:"/admin/add-product" }); /* FOR PUG */
  res.render("add-product", {
    title: "Add product",
    path: "/admin/add-product",
    activeProduct: true,
  }); /* FOR HANDLEBARS */
});

route.post("/add-product", (req, res, next) => {
  console.log(req.body.product);
  shopData.Product.push(req.body.product);
  // res.render("add-product", {
  //   title: "Add product",
  //   path: "/admin/add-product",
  //   activeProduct: true,
  // });
  res.redirect("/");
});

module.exports = route;
