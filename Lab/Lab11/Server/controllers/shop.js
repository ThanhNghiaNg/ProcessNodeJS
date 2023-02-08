const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.showAllProducts = (req, res, next) => {
  Product.findAll().then((data) => {
    return res.send({ products: data });
  });
};

exports.getProductById = (req, res, next) => {
  const id = req.params.id;
  Product.findAll({ where: { id: id } }).then((products) => {
    return res.send(products[0]);
  });
  // Product.findByPk(id).then((data) => {
  //   return res.send(data);
  // });

  // if (id) {
  //   Product.findById(id).then((data) => {
  //     return res.send(data);
  //   });
  // } else {
  //   res.status(404).send({ errorMessage: "Invalid Id." });
  // }
};

exports.postCart = (req, res, next) => {
  // const product = req.body;
  const productId = req.body.id;
  let newQuantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;

      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        newQuantity = product.cartItem.quantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart
        .addProduct(product, {
          through: { quantity: newQuantity },
        })
        .then((result) => {
          res.send(result);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = async (req, res, next) => {
  req.user.getCart().then((cart) => {
    return cart.getProducts().then((products) => {
      return res.send(products);
    });
  });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.body.id;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.send(result);
    });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  let items = [];
  req.user
    .getOrders()
    .then((orders) => {
      Promise.all(
        orders.map((order) => {
          return order.getProducts().then((products) => {
            items.push({
              orderId: order.id,
              items: products,
            });
          });
        })
      ).then(() => {
        res.send(items);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
