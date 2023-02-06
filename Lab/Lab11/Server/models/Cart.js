const sequelize = require("../utils/database");
const Sequelize = require("sequelize");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: { type: Sequelize.STRING, allowNull: false },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
  // userId: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Cart;

// module.exports = class Cart {
//   static addProduct(id, price, cb) {
//     const productPrice = Number(price);
//     fs.readFile(p, (err, fileContent) => {
//       console.log(err);
//       let cart = {
//         products: [],
//         totalPrice: 0,
//       };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//         const idxProd = cart.products.findIndex((prod) => prod.id === id);
//         if (idxProd !== -1) {
//           cart.products[idxProd].qty += 1;
//         } else {
//           cart.products.push({ id, qty: 1 });
//         }
//         cart.totalPrice += productPrice;
//       } else {
//         cart.products.push({ id, qty: 1 });
//         cart.totalPrice = productPrice;
//       }
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//       cb(cart);
//     });
//   }
// };
