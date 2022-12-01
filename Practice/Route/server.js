// const routes = require("./routes");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {});

// Three line below can be replace by
// app.listen(3001)

const http = require("http");
const server = http.createServer(app);
server.listen(3001);
