const Product = require("../models/Product");
exports.addProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save((data) => {
    if (data.length > 0) {
      res.send({ ok: true, data });
    } else {
      res.send({ ok: false });
    }
  });
};
