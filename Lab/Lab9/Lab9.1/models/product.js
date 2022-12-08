// // FILE
// const fs = require("fs");
// const path = require("path");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// DATABASE
const db = require('../util/database')

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.id = Math.random();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static fetchAll(){
    return db.execute("select * from ")
  }

  // save() {
  //   getProductsFromFile((products) => {
  //     products.push(this);
  //     fs.writeFile(p, JSON.stringify(products), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }

  // static findById(id, cb) {
  //   getProductsFromFile((data) => {
  //     const product = data.find((p) => Number(p.id) === Number(id));
  //     cb(product);
  //   });
  // }

  // static fetchAll(cb) {
  //   getProductsFromFile(cb);
  // }
};
