const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//routes
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
const User = require("./models/User");
const mongoConnect = require("./utils/database").mongoConnect;

const app = express();
// accept json and text
app.use(express.json({ type: ["application/json", "text/plain"] }));
// use cors to communicate with different client port
app.use(cors());
app.use((req, res, next) => {
  User.findById("6400b3888b6f3f29d0b4ef41")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
//use Routers
app.use("/admin", adminRoute);
app.use(shopRoute);

mongoConnect((client) => {
  app.listen(5000);
});
