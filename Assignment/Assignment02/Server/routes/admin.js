const express = require("express");
const adminControllers = require("../controllers/admin");

const route = express.Router();

route.get("/overall", adminControllers.getOverallInfo);

route.get("/hotels", adminControllers.getHotels);

route.post("/delete-hotel", adminControllers.deleteHotel);

route.get("/rooms", adminControllers.getRooms);

route.post("/delete-room", adminControllers.deleteRoom);

module.exports = route;
