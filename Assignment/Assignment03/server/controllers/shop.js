const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const { validationResult } = require("express-validator/check");
const mongoose = require("mongoose");

exports.getImagesOverall = (req, res, next) => {
  const imgOverallPath = "images/overall";
  const bannerPath = `${req.protocol}://${req.get(
    "host"
  )}/${imgOverallPath}/banner1.jpg`;
  const categoriesPaths = [];
  for (let i = 1; i <= 5; i++) {
    categoriesPaths.push(
      `${req.protocol}://${req.get("host")}/${imgOverallPath}/product_${i}.png`
    );
  }
  return res.send({ bannerPath, categoriesPaths });
};

exports.getProductsOverall = (req, res, next) => {
  const numberOfProducts = Number(req.query.numberOfProducts) || 8;
  Product.find().then((products) => {
    res.send(products.slice(0, numberOfProducts));
  });
};

exports.addProductToCart = (req, res, next) => {
  const { product, quantity } = req.body;
  User.findById(req.session.user._id).then((user) => {
    return user.addProductToCart(product, quantity).then((result) => {
      return res.send({ messahe: "Added Product to Cart." });
    });
  });
};

exports.getCart = (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("cart.items.productId")
    .then((user) => {
      return res.send(user.cart);
    });
};

exports.updateQuantityProductCart = (req, res, next) => {
  const { product, quantity } = req.body;
  User.findById(req.session.user._id).then((user) => {
    return user.updateProductCart(product, quantity).then((result) => {
      return res.send({ messahe: "Updated Product Cart." });
    });
  });
};

exports.deleteProductCart = (req, res, next) => {
  const id = req.params.id;
  User.findById(req.session.user._id).then((user) => {
    return user.deleteProductCart(id).then((result) => {
      return res.send({ messahe: "Deleted Product from Cart." });
    });
  });
};

exports.placeOrder = (req, res, next) => {
  const { fullName, email, phone, address, totalPrice } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ message: errors.array()[0].msg });
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (user.cart.items.length === 0) {
        return res
          .status(400)
          .send({ message: "There is no item in your cart!" });
      }
      const newOrder = new Order({
        items: [...user.cart.items],
        totalPrice,
        createAt: new Date(),
        user: {
          userId: user._id,
          fullName,
          email,
          phone,
          address,
        },
        delivery: "progressing",
        status: "paying",
      });
      return newOrder.save().then((result) => {
        return user.resetCart().then(() => {
          return res.send({ message: "Created Order!" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrderHistory = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then((orders) => {
    return res.send(orders);
  });
};

exports.getOrder = (req, res, next) => {
  const id = req.params.id;
  Order.find({ "user.userId": req.user._id, _id: id }).populate('items.productId').then((orders) => {
    if (!orders[0]) {
      return res.status(400).send({
        message: "Wrong Order ID or User do not have right to access",
      });
    }
    return res.send(orders[0]);
  });
};
