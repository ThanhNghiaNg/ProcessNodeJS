// 1. CREATE SERVER
// const http = require("http")

// const server = http.createServer((req, res)=>{
//     res.setHeader("Content-Type","text/html")
//     res.write("<h1>This is H1 respone!</h1>")
//     res.end()
// })
// server.listen(5000)

// 2. CREATE SERVER EXPRESS

const express = require("express");
const csurf = require("csurf");
const csrfProtection = csurf({ cookies: true });
const mongoose = require("mongoose");

const shopRoute = require("./routes/shop");

const app = express();

app.use(shopRoute);

app.get("/", csrfProtection, (req, res, next) => {
  return res.send("<h1>OK</h1>");
});

mongoose
  .connect(
    "mongodb+srv://owwibookstore:owwibookstore@cluster0.o5luvip.mongodb.net/TestProduct?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5000);
  });
