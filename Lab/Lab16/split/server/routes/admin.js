const express = require("express");
const isAuth = require("../middleware/is-auth")
const route = express.Router();
const productControllers = require('../controllers/products')
route.post("/add-product", isAuth, productControllers.addProduct);
route.get("/edit-product/:id", isAuth, productControllers.getEditProduct);
route.post("/delete-product/:id", isAuth, productControllers.postDeleteProduct);

module.exports = route;
