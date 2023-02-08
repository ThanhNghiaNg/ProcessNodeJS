const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./utils/database");
const User = require("./models/User");
const Product = require("./models/Product");
//routes
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

// Product - User
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
// User - Cart
User.hasOne(Cart);
Cart.belongsTo(User);
// Product Cart
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// Order
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

const app = express();
// accept json and text
app.use(express.json({ type: ["application/json", "text/plain"] }));
// use cors to communicate with different client port
app.use(cors());

//use Routers
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      if (!user) {
        User.create({ name: "Nghia", email: "Nghiant089@gmail.com" }).then(
          (user) => {
            user.createCart();
          }
        );
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/admin", adminRoute);
app.use(shopRoute);

sequelize.sync().then((result) => {
  app.listen(5000);
});
