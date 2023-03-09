const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        quantity: { type: Number, require: true },
      },
    ],
    toalPrice: { type: Number, require: true },
  },
});

module.exports = mongoose.model("User", userSchema);
