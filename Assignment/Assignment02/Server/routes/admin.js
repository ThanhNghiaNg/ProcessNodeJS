const express = require("express");
const adminControllers = require("../controllers/admin");
const isAdmin = require("../middlewares/isAdmin");

const route = express.Router();

route.post("/login", adminControllers.postAdminLogin);

route.get("/overall", isAdmin, adminControllers.getOverallInfo);

// HOTEL ROUTES
route.get("/hotels", isAdmin, adminControllers.getHotels);

route.get("/hotel/:id", isAdmin, adminControllers.getHotelById);

route.post("/delete-hotel", isAdmin, adminControllers.deleteHotel);

route.post("/create-hotel", isAdmin, adminControllers.createHotel);

route.post("/update-hotel", isAdmin, adminControllers.updateHotel);

// ROOMS ROUTES
route.get("/rooms", isAdmin, adminControllers.getRooms);

route.get("/room/:id", isAdmin, adminControllers.getRoomById);

route.get(
  "/rooms-non-reference",
  isAdmin,
  adminControllers.getRoomsNonReference
);

route.post("/delete-room", isAdmin, adminControllers.deleteRoom);

route.post("/create-room", isAdmin, adminControllers.createRoom);

route.post("/update-room", isAdmin, adminControllers.updateRoom);

// TRANSACTION ROUTES
route.get("/transactions", isAdmin, adminControllers.getTransactions);

module.exports = route;
