const path = require("path");
const fs = require("fs");
const p = path.join(process.mainModule.path, "data", "cart.json");

module.exports = class Cart {
  static fetchAllProduct(callback){
    fs.readFile(p, (err, fileContent)=>{
      if (!err){
        const items = JSON.parse(fileContent)
        callback(items)
      }
      else{
        console.log(err)
        callback([])
      }
    })
  }

  static addProduct(id, price, cb) {
    const productPrice = Number(price);
    fs.readFile(p, (err, fileContent) => {
      console.log(err);
      let cart = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(fileContent);
        const idxProd = cart.products.findIndex((prod) => prod.id === id);
        if (idxProd !== -1) {
          cart.products[idxProd].qty += 1;
        } else {
          cart.products.push({ id, qty: 1 });
        }
        cart.totalPrice += productPrice;
      } else {
        cart.products.push({ id, qty: 1 });
        cart.totalPrice = productPrice;
      }
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
      cb(cart);
    });
  }
};
