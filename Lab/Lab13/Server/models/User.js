const getDb = require("../utils/database").getDB;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart) {
    this.name = username;
    this.email = email;
    this.cart = cart;
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  addToCart(product){
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
  const db = getDB();
  db.collection('users').updateOne(
    { _id: new ObjectId(this._id) },
    { $set: {cart: updatedCart}}
  );

  }
}
