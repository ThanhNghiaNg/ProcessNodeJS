const express = require("express");
const path = require("path");
const rootDir = require("./utils/path");
const bodyParser = require("body-parser")

const app = express();
const addProductRoute = require("./routes/add-product");
const shopData = require("./routes/shop");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, "public")));
app.set("view engine", "pug")

app.use("/admin", addProductRoute);
app.use(shopData.Route);

app.use((req,res,next)=>{
    res.render('404', {title: "404 - Page Not Found"})
})

app.listen(3001);
