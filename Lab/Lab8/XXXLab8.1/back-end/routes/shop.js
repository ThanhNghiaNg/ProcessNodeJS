const express = require("express");
const route = express.Router();
const shopControllers = require("../controllers/shop");

route.get("/", shopControllers.showAllProducts);
route.post("/cart", shopControllers.postCart);

module.exports = route;
