const express = require("express");
const route = express.Router();
const productControllers = require('../controllers/products')
route.post("/add-product", productControllers.addProduct);
route.get("/edit-product/:id", productControllers.getEditProduct);
route.post("/delete-product/:id", productControllers.postDeleteProduct);

module.exports = route;
