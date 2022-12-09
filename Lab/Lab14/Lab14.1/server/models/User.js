const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
