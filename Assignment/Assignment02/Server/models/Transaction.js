const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  user: { type: String, require: true, ref: "User" },
  hotel: { type: Schema.Types.ObjectId, require: true, ref: "Hotel" },
  rooms: [],
  dateStart: { type: Date, require: true },
  dateEnd: { type: Date, require: true },
  price: { type: Number, require: true },
  payment: { type: String, require: true },
  status: { type: String, require: true },
  createdDate: { type: Date, require: true },
});

module.exports = mongoose.model("Transaction", hotelSchema);
