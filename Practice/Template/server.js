const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const app = express();
/* -- FOR HANDLEBARS ENGINE*/
app.engine(
  "hbs",
  expressHbs.engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");
/* -- FOR HANDLEBARS ENGINE*/
const addProductRoute = require("./routes/add-product");
const shopData = require("./routes/shop");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
/* -- FOR PUG ENGINE*/
// app.set("view engine", "pug");
// app.set("views", "views");
/* -- FOR PUG ENGINE*/

app.use("/admin", addProductRoute);
app.use(shopData.Route);

app.use((req, res, next) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

app.listen(3001);
