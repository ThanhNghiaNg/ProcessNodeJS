const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.showAllProducts = (req, res, next) => {
  Product.find().then((data) => {
    console.log(data);
    res.send({ ok: true, products: data });
  });
};

exports.getCart = (req, res, next) => {
  res.redirect("/cart");
};

exports.postCart = (req, res, next) => {
  const product = req.body;
  Cart.addProduct(product.id, product.price);
  res.send({ ok: true, product });
};
