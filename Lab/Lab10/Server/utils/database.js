const Sequelize = require("sequelize");

const sequelize = new Sequelize("lab10", "root", "Nghia089001", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "BookDb_lab9",
//   password: "Nghia089001",
// });

// module.exports = pool.promise();
