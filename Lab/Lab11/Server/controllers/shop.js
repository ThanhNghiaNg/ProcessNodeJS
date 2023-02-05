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
  const product = req.body;
  Cart.addProduct(product.id, product.price, (cart) => {
    res.send(JSON.stringify({ cart }));
  });
};
