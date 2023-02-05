const express = require("express");
const route = express.Router();
const shopControllers = require("../controllers/shop");

// Get all products
route.get("/", shopControllers.showAllProducts);

// Get product by Id
route.get("/product/:id", shopControllers.getProductById);

route.post("/cart", shopControllers.postCart);

module.exports = route;
