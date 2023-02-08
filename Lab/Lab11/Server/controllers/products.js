const Product = require("../models/Product");

exports.addProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  req.user
    .createProduct({ title, imageUrl, description, price })
    .then((data) => {
      return res.send(data);
    });
  // product.save((data) => {
  //   if (data.length > 0) {
  //     res.send({ ok: true, data });
  //   } else {
  //     res.send({ ok: false });
  //   }
  // });
};

exports.deleteProductById = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.send({ result, message: "Destroyed Product." });
    });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const { title, imageUrl, description, price } = req.body;
  Product.findByPk(id)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT");
      return res.send({ message: "UPDATED PRODUCT" });
    })
    .catch((err) => {
      res.send({ message: err });
    });
};
