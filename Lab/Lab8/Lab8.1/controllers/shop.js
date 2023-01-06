const Product = require("../models/product");
const Cart = require("../models/Cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchAllProduct((items) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: items,
    });
  });
};

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId, (product) => {
    Cart.addProduct(product.id, product.price, (cart) => {
      res.redirect("/cart");
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
