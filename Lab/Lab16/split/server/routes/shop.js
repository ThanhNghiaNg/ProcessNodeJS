const express = require("express");
const route = express.Router();
const shopControllers = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

route.get("/", csrfProtection, shopControllers.showAllProducts);
route.get("/cart", isAuth, shopControllers.getCart);
route.post("/cart", isAuth, csrfProtection, shopControllers.postCart);
route.post(
  "/cart/delete",
  isAuth,
  csrfProtection,
  shopControllers.postDeleteCart
);
route.post("/create-order", isAuth, csrfProtection, shopControllers.postOrder);
route.get("/order", isAuth, shopControllers.getOrder);

module.exports = route;
