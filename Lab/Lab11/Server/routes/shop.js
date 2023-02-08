const express = require("express");
const route = express.Router();
const shopControllers = require("../controllers/shop");

// Get all products
route.get("/", shopControllers.showAllProducts);

// Get product by Id
route.get("/product/:id", shopControllers.getProductById);

// post add product to cart
route.post("/cart", shopControllers.postCart);

// get products in cart
route.get("/cart", shopControllers.getCart);

// delete item from cart
route.post("/delete-item", shopControllers.deleteCartItem);

// post order
route.post("/order", shopControllers.postOrder);

// get orders
route.get("/orders", shopControllers.getOrders);
module.exports = route;
