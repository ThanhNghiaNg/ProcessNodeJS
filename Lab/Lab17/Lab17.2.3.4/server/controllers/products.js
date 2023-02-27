const Product = require("../models/Product");
const { validationResult } = require("express-validator");
exports.addProduct = (req, res, next) => {
  const { title, imageUrl, description, price, id } = req.body;
  const userId = req.session.user._id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ message: errors.array()[0].msg, errors });
  }
  if (id) {
    Product.findById(id).then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      product.save().then((result) => {
        if (result) {
          res.send({ ok: true, result });
          return;
        }
      });
    });
  } else {
    const product = new Product({
      title,
      imageUrl,
      description,
      price,
      userId,
    });
    product.save().then((result) => {
      if (result) {
        res.send({ ok: true, result });
        return;
      }
    });
  }
};

exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndRemove(id).then((result) => {
    res.send({ result });
  });
};
