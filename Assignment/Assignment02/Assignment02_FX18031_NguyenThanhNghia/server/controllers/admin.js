const Transaction = require("../models/Transaction");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const User = require("../models/User");
const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const getPageResult = require("../utils/global").getPageResult;

exports.postAdminLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.find({ email }).then((users) => {
    const user = users[0];
    if (!user) {
      return res
        .status(401)
        .send({ message: "Username or email do not exist!" });
    } else {
      if (!user.isAdmin) {
        return res.status(401).send({ message: "User is not Admin!" });
      } else if (password === user.password) {
        return res
          .status(200)
          .send({ message: "Login Successfully!", user: user._id });
      } else {
        return res.status(401).send({ message: "Wrong password!" });
      }
    }
  });
};

// Get overall information for dashboard
exports.getOverallInfo = (req, res, next) => {
  const currentMonth = new Date().getMonth();
  Transaction.find().sort({createdDate: -1})
    .populate(["user", "hotel"])
    .then((transactions) => {
      const uniqueUsers = [
        ...new Set(transactions.map((transaction) => transaction.user)),
      ];
      const numberUser = uniqueUsers.length;
      const numberTransactions = transactions.length;
      const earnings = transactions.reduce(
        (acc, transaction) => acc + transaction.price,
        0
      );
      const numMonth = new Set(transactions.map(transaction=> new Date(transaction.createdDate).getMonth()))

      const avgEarnings = earnings / numMonth.size;
      return res.send({
        numberUser,
        numberTransactions,
        earnings,
        avgEarnings,
        latestTransaction: transactions.slice(0, 8),
      });
    });
};

// Get hotel with hotel id
exports.getHotelById = (req, res, next) => {
  const hotelId = req.params.id;
  Hotel.findById(hotelId)
    .then((hotel) => {
      return res.send(hotel);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all hotels
exports.getHotels = (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const resultPerPage = req.query.resultPerPage
    ? Number(req.query.resultPerPage)
    : 10;
  return Hotel.find()
    .then((hotels) => {
      return res.send(getPageResult(hotels, page, resultPerPage));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Handle delete hotel
exports.deleteHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;
  return Hotel.findById(hotelId).then((hotel) => {
    Transaction.find({ hotel: hotelId }).then((transactions) => {
      if (transactions.length > 0) {
        return res.status(451).send({
          message:
            "Cannot Delete Hotel!\nHotel already have at least one transaction!",
        });
      } else {
        Hotel.findByIdAndDelete(hotelId).then(() => {
          return res.send({ message: "Deleted hotel." });
        });
      }
    });
  });
};

// Handle add hotel
exports.createHotel = (req, res, next) => {
  const {
    name,
    type,
    city,
    address,
    distance,
    title,
    description,
    price,
    images,
    featured,
  } = req.body;
  const newHotel = new Hotel({
    name,
    type,
    city,
    address,
    title,
    distance,
    photos: [...images],
    desc: description,
    featured,
    price,
  });
  newHotel
    .save()
    .then((hotel) => {
      return res.send({ message: "Added Hotel", hotel });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateHotel = (req, res, next) => {
  const {
    id,
    name,
    type,
    city,
    address,
    distance,
    title,
    description,
    price,
    images,
    featured,
  } = req.body;
  Hotel.updateOne(
    { _id: id },
    {
      $set: {
        name,
        type,
        city,
        address,
        title,
        distance,
        photos: [...images],
        desc: description,
        featured,
        price,
      },
    }
  )
    .then((result) => {
      return res.send({ messgae: "Updated hotel information!" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get room with room id
exports.getRoomById = (req, res, next) => {
  const roomId = req.params.id;
  Room.findById(roomId)
    .then((room) => {
      return res.send(room);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all rooms with page?
exports.getRooms = (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const resultPerPage = req.query.resultPerPage
    ? Number(req.query.resultPerPage)
    : 10;
  Room.find()
    .then((rooms) => {
      return res.send(getPageResult(rooms, page, resultPerPage));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all rooms not in a hotel?
exports.getRoomsNonReference = (req, res, next) => {
  Room.aggregate([
    {
      $lookup: {
        from: "hotels",
        localField: "_id",
        foreignField: "rooms",
        as: "hotels",
      },
    },
    {
      $match: {
        hotels: { $size: 0 },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
      },
    },
  ])
    .then((rooms) => {
      res.send(rooms);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Handle delete rooms
exports.deleteRoom = (req, res, next) => {
  const roomId = req.body.roomId;
  let exist = false;
  Transaction.find()
    .populate({ path: "hotel", populate: { path: "rooms" } })
    .then((transactions) => {
      const listRoomPickedEachHotel = transactions.map((transaction) => {
        const selectedRoom = transaction.rooms;
        return transaction.hotel.rooms.filter((room) =>
          room.roomNumbers.some((number) => selectedRoom.includes(number))
        );
      });

      listRoomPickedEachHotel.forEach((rooms) => {
        rooms.forEach((room) => {
          if (exist === false) {
            if (room._id.toString() === roomId) {
              exist = true;
              return res.status(451).send({
                message:
                  "Cannot delete this room! It's already has been in a transaction.",
              });
            }
          }
        });
      });

      if (exist === false) {
        return Room.findByIdAndDelete(roomId).then((room) => {
          return Hotel.findOne({ rooms: { $in: [room._id] } }).then((hotel) => {
            if (hotel) {
              hotel.rooms = hotel.rooms.filter(
                (room) => room.toString() !== roomId
              );
              return hotel.save().then((result) => {
                return res.send({ message: "Deleted Room and rederence." });
              });
            } else {
              return res.send({ message: "Deleted Room!" });
            }
          });
        });
      }
    });
};

// Handle add rooms
exports.createRoom = (req, res, next) => {
  const { title, price, maxPeople, desc, roomNumbers, hotelId } = req.body;
  const newRoom = new Room({ title, price, maxPeople, desc, roomNumbers });
  newRoom
    .save()
    .then((room) => {
      if (hotelId) {
        Hotel.updateOne({ _id: hotelId }, { $push: { rooms: room._id } }).then(
          (result) => {
            return res.send({ message: "Added Room to Hotel." });
          }
        );
      } else {
        return res.send({ message: "Added Room." });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateRoom = (req, res, next) => {
  const { id, title, desc, price, maxPeople, roomNumbers } = req.body;
  console.log("UPDATE:\n", { id, title, desc, price, maxPeople, roomNumbers });
  return Room.updateOne(
    { _id: id },
    { $set: { title, desc, price, maxPeople, roomNumbers } }
  )
    .then((result) => {
      return res.send({ message: "Updated room information" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get All transaction with page?
exports.getTransactions = (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const resultPerPage = req.query.resultPerPage
    ? Number(req.query.resultPerPage)
    : 10;
  Transaction.find()
    .populate(["hotel", "user"])
    .then((transactions) => {
      return res.send(getPageResult(transactions, page, resultPerPage));
    })
    .catch((err) => {
      console.log(err);
    });
};
