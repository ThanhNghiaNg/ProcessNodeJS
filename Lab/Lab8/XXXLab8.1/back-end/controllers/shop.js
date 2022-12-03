const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.showAllProducts = (req, res, next) => {
  Product.fetchAll((data) => {
    console.log(data);
    res.send({ ok: true, products: data });
  });
};

exports.postCart = (req, res, next) => {
  const product = req.body;
  Cart.addProduct(product.id, product.price, (cart) => {
    res.send(JSON.stringify({ cart }));
  });
};
