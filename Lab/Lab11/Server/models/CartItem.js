const sequelize = require("../utils/database");
const Sequelize = require("sequelize");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
