const express = require("express");
const isAuth = require("../middleware/is-auth");
const route = express.Router();
const productControllers = require("../controllers/products");
const { check, body } = require("express-validator");
route.post(
  "/add-product",
  [
    body(
      "title",
      "Title is not valid (must not contain special characters and have more than 3 characters)"
    )
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim(),
    body("imageUrl", "URL is not valid").isURL(),
    body("price").isFloat(),
    body("description", "Description must at leats 5 characters").isLength({
      min: 5,
    }),
  ],
  isAuth,
  productControllers.addProduct
);
route.get("/edit-product/:id", isAuth, productControllers.getEditProduct);

route.post(
  "/edit-product/:id",
  [
    body(
      "title",
      "Title is not valid (must not contain special characters and have more than 3 characters)"
    )
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim(),
    body("imageUrl", "URL is not valid").isURL(),
    body("price").isFloat(),
    body("description", "Description must at leats 5 characters").isLength({
      min: 5,
    }),
  ],
  isAuth,
  productControllers.getEditProduct
);

route.post("/delete-product/:id", isAuth, productControllers.postDeleteProduct);

module.exports = route;
