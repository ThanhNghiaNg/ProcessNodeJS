const express = require("express");
const route = express.Router();
const shopControllers = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

route.get("/", shopControllers.showAllProducts);
route.get("/cart", isAuth, shopControllers.getCart);
route.post("/cart", isAuth, shopControllers.postCart);
route.post("/cart/delete", isAuth, shopControllers.postDeleteCart);
route.post("/create-order", isAuth, shopControllers.postOrder);
route.get("/order", isAuth, shopControllers.getOrder);

module.exports = route;
