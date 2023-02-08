const sequelize = require("../utils/database");
const Sequelize = require("sequelize");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;
