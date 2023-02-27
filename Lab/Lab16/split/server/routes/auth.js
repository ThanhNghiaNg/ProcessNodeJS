const express = require("express");
const authControllers = require("../controllers/auth");
const route = express.Router();

route.post("/register", authControllers.postRegister);
route.post("/login", authControllers.postlogin);
route.post("/logout", authControllers.postLogout);

module.exports = route;
