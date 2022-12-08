const Product = require("../models/Product");
exports.addProduct = (req, res, next) => {
  const { title, imageUrl, description, price, id } = req.body;
  const product = new Product(title, imageUrl, description, price, id);
  product.save().then((result) => {
    if (result) {
      res.send({ ok: true, result });
      return;
    }
  });
};

exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByID(id)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.removeByID(id).then((result) => {
    res.send({ result });
  });
};
