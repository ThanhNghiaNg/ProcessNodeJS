// MONGOOSE
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title:{type: String, require: true},
  price: {type: Number, require: true},
  imageUrl: {type: String, require: true},
  description: {type: String, require: true}
})

module.exports = mongoose.model('Product', productSchema)

// JSON
// const fs = require("fs");
// const path = require("path");
// const p = path.join(process.mainModule.path, "data", "products.json");
// const

// MONGODB
// const getDB = require("../utils/database").getDB;
// const mongoDB = require("mongodb");
// module.exports = class Product {
//   constructor(title, imageUrl, description, price, id) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//     this._id = id;
//   }
//   save() {
//     const db = getDB();
//     let dbCol;
//     if (this._id) {
//       dbCol = db.collection("products").updateOne(
//         { _id: new mongoDB.ObjectId(this._id) },
//         {
//           $set: {
//             title: this.title,
//             imageUrl: this.imageUrl,
//             description: this.description,
//             price: this.price,
//           },
//         }
//       );
//     } else {
//       dbCol = db.collection("products").insertOne(this);
//     }
//     return dbCol
//       .then((result) => {
//         console.log(result);
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static findByID(id) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find({ _id: new mongoDB.ObjectId(id) })
//       .toArray()
//       .then((result) => {
//         return result[0];
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static removeByID(id) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .remove({ _id: new mongoDB.ObjectId(id) })
//       .then((result) => {
//         console.log(result);
//         return result;
//       });
//   }
//   static fetchAll() {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((result) => {
//         console.log(result.length);
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

  // JSON
  // save(cb) {
  //   fs.readFile(p, (err, data) => {
  //     if (!err) {
  //       const product = {
  //         id: Math.random(),
  //         title: this.title,
  //         imageUrl: this.imageUrl,
  //         description: this.description,
  //         price: this.price,
  //       };
  //       const products = [...JSON.parse(data), product];
  //       fs.writeFile(p, JSON.stringify(products), (err) => {
  //         console.log(err);
  //       });
  //       cb(products);
  //     } else {
  //       cb([]);
  //     }
  //   });
  // }
  // static fetchAll(cb) {
  //   fs.readFile(p, (err, data) => {
  //     if (!err) {
  //       const products = JSON.parse(data);
  //       cb(products);
  //     } else {
  //       cb([]);
  //     }
  //   });
  // }
// };
