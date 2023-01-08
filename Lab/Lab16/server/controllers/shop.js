const Product = require("../models/Product");
const Order = require("../models/Order");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.showAllProducts = (req, res, next) => {
  Product.find().then((data) => {
    res.send({ ok: true, products: data});
  });
};

exports.getCart = (req, res, next) => {
  req.session.user.populate("cart.items.productId").then((result) => {
    return res.send(JSON.stringify(result.cart.items));
  });
};

exports.postCart = (req, res, next) => {
  const product = req.body;
  req.session.user.addToCart(product.id);
  res.send({ ok: true, product });
};

exports.postDeleteCart = (req, res, next) => {
  const id = req.body.id;
  req.user.removeFromCart(id).then((result) => {
    res.send({ ok: true });
  });
};

exports.postOrder = (req, res, next) => {
  console.log("ORDER");
  req.user.populate("cart.items.productId").then((result) => {
    const products = result.cart.items.map((i) => {
      return { product: i.productId._doc, quantity: i.quantity };
    });
    const order = new Order({
      products: products,
      user: { name: req.user.name, _id: req.user._id },
    });
    order
      .save()
      .then(() => {
        return req.user.resetCart();
      })
      .then(() => {
        res.send({});
      });
  });
};

exports.getOrder = (req, res, next) => {
  Order.find({ "user._id": req.user._id }).then((result) => {
    res.send({ orders: result });
  });
};
