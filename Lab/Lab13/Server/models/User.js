const getDb = require("../utils/database").getDB;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .toArray()
      .then((result) => {
        return result[0];
      });
  }

  addToCart(product) {
    const items = [...this.cart.items];
    const updateTotalPrice =
      Number(this.cart.totalPrice) + Number(product.price);
    const idx = items.findIndex((item) => item.id === product.id);
    if (idx >= 0) {
      items[idx].quantity += 1;
    } else {
      items.push({ id: product.id, quantity: 1 });
    }
    const updatedCart = {
      items: [...items],
      totalPrice: updateTotalPrice,
    };
    const db = getDb();
    db.collection("users").updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }
}

module.exports = User;
