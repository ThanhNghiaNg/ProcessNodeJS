const express = require("express");
const route = express.Router();
const bookingControllers = require("../controllers/booking");

route.use("/number-hotel-by-city", bookingControllers.getNumberHotelByCity);

route.use("/number-hotel-by-type", bookingControllers.getNumberHotelByType);

route.use("/top-rating-hotel", bookingControllers.getTopRatingHotel);

route.get("/search", bookingControllers.getSearchResult)

route.get('/hotel/:id', bookingControllers.getHotel)

route.get("/images", bookingControllers.getImages);

module.exports = route;
