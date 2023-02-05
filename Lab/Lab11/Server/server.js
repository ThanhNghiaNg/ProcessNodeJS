const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./utils/database");
//routes
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");

const app = express();
// accept json and text
app.use(express.json({ type: ["application/json", "text/plain"] }));
// use cors to communicate with different client port
app.use(cors());

//use Routers
app.use("/admin", adminRoute);
app.use(shopRoute);

sequelize.sync().then((result) => {
  app.listen(5000);
});
