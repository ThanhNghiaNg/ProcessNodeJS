const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.showAllProducts = (req, res, next) => {
  Product.fetchAll().then(([data, dataInfo]) => {
    console.log(data);
    res.send({ ok: true, products: data });
  });
};

exports.getProductById = (req, res, next) => {
  const id = req.params.id;
  if (id) {
    Product.findById(id).then(([data, dataInfo]) => {
      return res.send(data);
    });
  } else {
    res.status(404).send({ errorMessage: "Invalid Id." });
  }
};

exports.postCart = (req, res, next) => {
  const product = req.body;
  Cart.addProduct(product.id, product.price, (cart) => {
    res.send(JSON.stringify({ cart }));
  });
};
