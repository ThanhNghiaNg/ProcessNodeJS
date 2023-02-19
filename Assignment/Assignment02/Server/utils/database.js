const Hotel = require("../models/Hotel");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.addReferenceRooms = () => {
  Hotel.find().then((hotels) => {
    hotels = hotels.map((hotel) => {
      //   console.log(hotel);
      hotel.rooms = hotel.rooms.map((room) => {
        if (typeof room === "string") {
          return Schema.Types.ObjectId(room);
        }
        return room;
      });
      return hotel.save();
    });
  });
};
