const express = require("express");
const adminControllers = require("../controllers/admin");
const isAdmin = require("../middlewares/isAdmin");

const route = express.Router();

route.get("/overall", isAdmin, adminControllers.getOverallInfo);

route.get("/hotels", adminControllers.getHotels);

route.post("/delete-hotel", adminControllers.deleteHotel);

route.get("/rooms", adminControllers.getRooms);

route.post("/delete-room", adminControllers.deleteRoom);

route.get("/transactions", adminControllers.getTransactions);

module.exports = route;
