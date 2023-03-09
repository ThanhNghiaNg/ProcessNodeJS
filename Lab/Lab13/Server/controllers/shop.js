const Product = require("../models/Product");
const User = require("../models/User");
exports.showAllProducts = (req, res, next) => {
  Product.fetchAll().then((data) => {
    res.send({ ok: true, products: data });
  });
};

exports.getCart = (req, res, next) => {
  const result = { items: [], totalPrice: req.user.cart.totalPrice };
  Promise.all(
    req.user.cart.items.map((item) => {
      return Product.findByID(item.id).then((productInfo) => {
        result.items.push({ ...item, productInfo });
      });
    })
  ).then(() => {
    res.send(result);
  });
};

exports.postCart = (req, res, next) => {
  const product = req.body;
  req.user.addToCart(product);
  res.send({ ok: true, cart: req.user.cart });
};
