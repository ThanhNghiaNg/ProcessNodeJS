const mysql = require('mysql2')

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "BookDb_lab9",
  password: "Nghia089001",
});

module.exports = pool.promise()