const express = require("express");
const route = express.Router();
const productControllers = require("../controllers/products");
route.post("/add-product", productControllers.addProduct);
route.post("/delete-product/:id", productControllers.deleteProductById);
route.post("/edit-product/:id", productControllers.postEditProduct);
module.exports = route;
