const express = require("express");
const authControllers = require("../controllers/auth");
const route = express.Router();
const { check, body } = require("express-validator");
const User = require("../models/User.js");

route.post(
  "/register",
  [
    body("password").custom((value, { req }) => {
      console.log(req.body);
      if (
        req.body.confirmPassword.length === 0 ||
        req.body.email.length === 0 ||
        value.length === 0
      )
        throw new Error("All information must not be empty!");
      if (req.body.confirmPassword !== value) {
        throw new Error("Password and Confirm Password must be the same!");
      }
      return true;
    }),
    body("password", "Password must be more than 8 chracters").isLength({
      min: 8,
    }),
    body("email").isEmail().withMessage("Invalid Email!"),
    body("email").custom((value, req) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Username is already registered!");
        }
      });
    }),
  ],
  authControllers.postRegister
);
route.post(
  "/login",
  [
    body("password", "Username or password must not be empty!").custom(
      (value, { req }) => {
        if (value.length === 0 || req.body.email.length === 0) return false;
        return true;
      }
    ),
    body("email").isEmail().withMessage("Invalid Email!"),
    body("email").custom((value, req) => {
      return User.findOne({ email: value }).then((user) => {
        if (!user) {
          //   throw new Error("Username is not registered");
          return Promise.reject("Username is not registered");
        }
      });
    }),
  ],
  authControllers.postlogin
);
route.post("/logout", authControllers.postLogout);

module.exports = route;
