const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
// const mongoConnect = require("./utils/database").mongoConnect;
const mongoose = require("mongoose");

const app = express();
// accept json and text
app.use(express.json({ type: ["application/json", "text/plain"] }));
// use cors to communicate with different client port
app.use(cors());

//use Routers
app.use("/admin", adminRoute);
app.use(shopRoute);
mongoose.set('strictQuery', false);
mongoose
  .connect(
    "mongodb+srv://owwibookstore:owwibookstore@cluster0.o5luvip.mongodb.net/TestProduct?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
