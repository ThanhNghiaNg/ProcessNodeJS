const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Transaction = require("../models/Transaction");
const fs = require("fs");
const path = require("path");

// get image
exports.getImages = (req, res, next) => {
  const url = req.query.url;
  const imagePath = path.join(process.mainModule.path, url);
  const imageStream = fs.createReadStream(imagePath);
  imageStream.pipe(res);
};

// Get the number of hotel by city
exports.getNumberHotelByCity = (req, res, next) => {
  const cityListRequested = req.body.cities;
  const initResult = cityListRequested.map((city) => {
    return {
      name: city,
      number: 0,
      image: `http://localhost:5000/images?url=data/CityImage/${city.replace(
        " ",
        "%20"
      )}.jpg`,
    };
  });
  Hotel.find().then((hotels) => {
    const result = hotels.reduce((acc, hotel) => {
      const idx = acc.findIndex((city) => city.name === hotel.city);
      if (idx !== -1) {
        acc[idx].number += 1;
      }
      return acc;
    }, initResult);

    return res.send(result);
  });
};

// Get the number of hotel by type
exports.getNumberHotelByType = (req, res, next) => {
  const typeListRequested = req.body.types;
  console.log(typeListRequested);
  const initResult = typeListRequested.map((type) => {
    return {
      name: type,
      count: 0,
      image: `http://localhost:5000/images?url=data/TypeImage/${type}.jpg`,
    };
  });
  Hotel.find().then((hotels) => {
    const result = hotels.reduce((acc, hotel) => {
      const idx = acc.findIndex((hotelType) => hotelType.name === hotel.type);
      if (idx !== -1) {
        acc[idx].count += 1;
      }
      return acc;
    }, initResult);

    return res.send(result);
  });
};

// Get the top N rating hotel
exports.getTopRatingHotel = (req, res, next) => {
  const topN = req.body.N;
  Hotel.find().then((hotels) => {
    const sortedHutels = hotels.sort((a, b) => {
      b.rate - a.rate;
    });
    return res.send(sortedHutels.slice(0, topN));
  });
};

// get search result by query
exports.getSearchResult = (req, res, next) => {
  console.log(req.url);
  // Get parameters from query
  const destination = req.query.destination;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const adult = Number(req.query.adult);
  const children = Number(req.query.children);
  const room = req.query.room;

  // Find all hotel with its rooms information
  Hotel.find()
    .populate("rooms")
    .then((hotels) => {
      // Find rooms appropriate with require
      const hotelWithRoomsSuitable = hotels.map((hotel) => {
        hotel.rooms = hotel.rooms.filter((room) => {
          const numberOfPeopleSuitable = adult + children <= room.maxPeople;
          const priceSuitable =
            minPrice <= room.price && room.price <= maxPrice;
          return numberOfPeopleSuitable;
        });
        return hotel;
      });

      // Check if room in hotel booked or not
      Promise.all(
        hotelWithRoomsSuitable.map((hotel) => {
          // Find any transactions that are associated with the current hotel
          return Transaction.find({ hotel: hotel._id }).then((transactions) => {
            // If there are no transactions, add the hotel to the suitable list and return it
            if (transactions.length === 0) {
              return hotel;
            } else {
              // Otherwise, kepp any room numbers that are not in transactions or not conflict date
              transactions.forEach((transaction) => {
                hotel.rooms.roomNumbers = hotel.rooms.roomNumbers.filter(
                  (roomNumber) => {
                    return (
                      !transaction.includes(roomNumber) ||
                      transaction.dateEnd < startDate ||
                      transaction.dateStart > endDate
                    );
                  }
                );
              });
              // Add the hotel to the suitable list and return it
              return hotel;
            }
          });
        })
      ).then((hotels) => {
        // Find hotel appropriate with require
        // console.log(hotels)
        const result = hotels.filter((hotel) => {
          return hotel.rooms.length >= room && hotel.city === destination;
        });
        return res.send(result);
      });
    });
};

exports.getHotel = (req, res, next) => {
  const id = req.params.id;
  Hotel.findOne({ _id: id })
    .populate("rooms")
    .then((hotel) => {
      console.log(hotel);
      res.send(hotel);
    });
};
