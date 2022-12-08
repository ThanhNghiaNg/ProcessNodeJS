const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "bookstoredb",
  password: "Nghia089001",
});

module.exports = pool.promise();
