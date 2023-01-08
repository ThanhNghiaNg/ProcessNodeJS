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
  Product.fetchAll((allProducts) => {
    if (allProducts.length > 0) {
      Cart.getCart((cart) => {
        if (cart.products.length > 0) {
          const products = cart.products.map((p) => {
            return {
              ...allProducts.filter(
                (prod) => Number(prod.id) === Number(p.id)
              )[0],
              quantity: p.qty,
            };
          });

          cart.products = [...products];
          // console.log(cart);
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            cart: cart,
          });
        }
        // Khi chưa có file cart.json
        else {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            cart: { products: [], totalPrice: 0 },
          });
        }
      });
    } else {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        cart: { products: [], totalPrice: 0 },
      });
    }
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Cart.deleteById(id, (cart) => {
    this.getCart(req, res, next);
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
