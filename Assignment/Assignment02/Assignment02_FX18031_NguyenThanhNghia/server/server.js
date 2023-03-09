const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const addReferenceRooms = require("./utils/database").addReferenceRooms;
const authRoute = require("./routes/auth");
const bookingRoute = require("./routes/booking");
const adminRoute = require("./routes/admin");

const server = express();

// accept json and text
server.use(express.json({ type: ["application/json", "text/plain"] }));
// use cors to communicate with different client port
server.use(cors());

server.use((req, res, next) => {
  addReferenceRooms();
  next();
});

server.use(authRoute);
server.use(bookingRoute);
server.use("/admin", adminRoute);

// Connect to mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://owwibookstore:owwibookstore@cluster0.o5luvip.mongodb.net/FUNiXAssignment02?retryWrites=true&w=majority"
  )
  .then((result) => {
    server.listen(5000);
  })
  .catch((err) => console.log(err));
