const express = require("express");
const route = express.Router();
const productControllers = require('../controllers/products')
route.post("/add-product", productControllers.addProduct);
module.exports = route;
