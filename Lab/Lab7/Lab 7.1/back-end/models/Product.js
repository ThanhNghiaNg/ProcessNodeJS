const fs = require("fs");
const path = require("path");
const p = path.join(process.mainModule.path, "data", "products.json");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save(cb) {
    fs.readFile(p, (err, data) => {
      if (!err) {
        const product = {
          title: this.title,
          imageUrl: this.imageUrl,
          description: this.description,
          price: this.price,
        };
        // console.log(product);
        const products = [...JSON.parse(data), product];
        console.log(products);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
        cb(products);
      } else {
        cb([]);
      }
    });
  }
  static fetchAll(cb) {
    fs.readFile(p, (err, data) => {
      if (!err) {
        const products = JSON.parse(data);
        cb(products);
      } else {
        cb([]);
      }
    });
  }
};
