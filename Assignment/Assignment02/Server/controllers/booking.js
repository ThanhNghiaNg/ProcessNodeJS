const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Transaction = require("../models/Transaction");
const fs = require("fs");
const path = require("path");
const convertStrToDate = require("../utils/global").convertStrToDate;

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
      res.send(hotel);
    })
    .then((err) => {
      console.log(err);
    });
};

exports.getAvailableRooms = (req, res, next) => {
  const hotelId = req.body.hotelId;
  const startDate = convertStrToDate(req.body.startDate, "/");
  const endDate = convertStrToDate(req.body.endDate, "/");

  Hotel.findOne({ _id: hotelId })
    .populate("rooms")
    .then((hotel) => {
      Transaction.find({ hotel: hotelId }).then((transactions) => {
        if (transactions.length > 0) {
          // Otherwise, keep room numbers that are not in transactions or not conflict date
          transactions.forEach((transaction) => {
            hotel.rooms = hotel.rooms.map((type) => {
              type.roomNumbers = type.roomNumbers.filter((roomNumber) => {
                return (
                  !transaction.rooms.includes(roomNumber) ||
                  transaction.dateEnd.getDate() < startDate.getDate() ||
                  transaction.dateStart.getDate() > endDate.getDate()
                );
              });
              return type;
            });
          });
        }
        return res.send(hotel.rooms);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postTransaction = (req, res, next) => {
  const hotelId = req.body.hotelId;
  const rooms = req.body.rooms;
  const date = req.body.date;
  const paymentMethod = req.body.paymentMethod;
  const user = req.body.user;
  const price = req.body.price;

  const transaction = new Transaction({
    user: user.id,
    hotel: hotelId,
    rooms: rooms.map((room) => room.roomNumber),
    dateStart: convertStrToDate(date.startDate, "/"),
    dateEnd: convertStrToDate(date.endDate, "/"),
    price,
    payment: paymentMethod,
    status: "Booked",
    createdDate: new Date(),
  });

  return transaction
    .save()
    .then((result) => {
      res.status(200).send({ nessage: "Created transaction!" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTransaction = (req, res, next) => {
  const user = req.params.userId;
  Transaction.find({ user: user })
    .populate("hotel")
    .then((transactions) => {
      res.status(200).send(transactions.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};
