const express = require("express");
const route = express.Router();
const bookingControllers = require("../controllers/booking");

route.use("/number-hotel-by-city", bookingControllers.getNumberHotelByCity);

route.use("/number-hotel-by-type", bookingControllers.getNumberHotelByType);

route.use("/top-rating-hotel", bookingControllers.getTopRatingHotel);

route.get("/search", bookingControllers.getSearchResult);

route.get("/hotel/:id", bookingControllers.getHotel);

route.use("/available-rooms", bookingControllers.getAvailableRooms);

route.post("/create-transaction", bookingControllers.postTransaction);

route.get("/transactions/:userId", bookingControllers.getTransaction);

route.get("/images", bookingControllers.getImages);

module.exports = route;
