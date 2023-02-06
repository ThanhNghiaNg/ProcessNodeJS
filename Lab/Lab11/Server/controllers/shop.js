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
  console.log(product.id);
  Cart.findAll({ where: { productId: product.id } }).then((products) => {
    const prod = products[0];
    if (!prod) {
      console.log("Empty");
      return Cart.create({ productId: product.id, quantity: 1 })
        .then((result) => res.send(result))
        .catch((err) => {
          console.log(err);
        });
    } else {
      prod.quantity = prod.quantity + 1;
      return prod.save().then((result) => res.send(result));
    }
  });
};

exports.getCart = async (req, res, next) => {
  const items = await Cart.findAll();
  const productIds = items.map((item) => item.productId);
  const products = await Promise.all(
    productIds.map((id) => Product.findByPk(id))
  );
  const combined = products.map((product, index) => {
    return {
      ...product.dataValues,
      quantity: items[index].quantity,
    };
  });
  return res.send(combined);
};
