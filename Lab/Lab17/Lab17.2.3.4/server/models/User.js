const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (productId) {
  const productIdx = this.cart.items.findIndex((p) => {
    return p.productId.toString() === productId;
  });
  const updatedCart = [...this.cart.items];
  if (productIdx >= 0) {
    updatedCart[productIdx].quantity += 1;
  } else {
    updatedCart.push({ productId, quantity: 1 });
  }
  this.cart.items = [...updatedCart];
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCart = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId;
  });
  this.cart.items = [...updatedCart];
  return this.save();
};

userSchema.methods.resetCart = function () {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
