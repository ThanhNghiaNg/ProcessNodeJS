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
  const products = Product.fetchAll();
  console.log(
    products.then((data) => {
      res.render("shop/index", {
        path: "/",
        pageTitle: "Shop",
        prods: data[0],
      });
    })
  );
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId).then((product) => {
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
