const express = require("express");
const route = express.Router();
const shopControllers = require("../controllers/shop");

route.get("/", shopControllers.showAllProducts);
route.get("/cart", shopControllers.getCart);
route.post("/cart", shopControllers.postCart);
route.post("/cart/delete", shopControllers.postDeleteCart);
route.post("/order", shopControllers.postOrder);

module.exports = route;
