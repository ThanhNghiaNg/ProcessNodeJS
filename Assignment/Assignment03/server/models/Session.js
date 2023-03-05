const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  streamData: [
    {
      createAt: { type: Date, require: true },
      content: { type: String, require: true },
      user: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Session", sessionSchema);
