const Transaction = require("../models/Transaction");
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const User = require("../models/User");

// Get overall information for dashboard
exports.getOverallInfo = (req, res, next) => {
  console.log("running GET OVERALL");
  const currentMonth = new Date().getMonth();
  Transaction.find({
    createdDate: {
      $gte: new Date(new Date().getFullYear(), currentMonth, 1),
      $lte: new Date(new Date().getFullYear(), currentMonth + 1, 1),
    },
  })
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
      const avgEarnings = earnings / transactions.length;
      const sortedTransactions = transactions.sort(
        (a, b) => b.createdDate - a.createdDate
      );
      return res.send({
        numberUser,
        numberTransactions,
        earnings,
        avgEarnings,
        latestTransaction: sortedTransactions.slice(0, 8),
      });
    });
};

// Get hotel with hotel id
exports.getHotelById = (req, res, next) => {
  console.log("running GET HOTEL BY ID");
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
  return Hotel.find()
    .then((hotels) => {
      return res.send(hotels);
    })
    .catch((err) => {
      console.log("FINDED ERROR");
      console.log(err);
    });
};

// Handle delete hotel
exports.deleteHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;
  return Hotel.deleteOne({ _id: hotelId })
    .then(() => {
      return res.send({ message: "Deleted document" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Handle add hotel
exports.addHotel = (req, res, next) => {
  const {
    name,
    type,
    city,
    address,
    title,
    distance,
    photos,
    desc,
    rating,
    featured,
    rooms,
  } = req.body;
  const newHotel = new Hotel({
    name,
    type,
    city,
    address,
    title,
    distance,
    photos,
    desc,
    rating,
    featured,
    rooms,
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

// Get room with room id
exports.getHotelById = (req, res, next) => {
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
  Room.find()
    .then((rooms) => {
      return res.send(rooms);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Handle delete rooms
exports.deleteRoom = (req, res, next) => {
  // Chưa có điều kiện, xem lại đề
  const roomId = req.params.roomId;
  Room.findByIdAndDelete(roomId)
    .then((doc) => {
      res.send({ message: "Deleted document", doc });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Handle add rooms
exports.addRoom = (req, res, next) => {
  const { title, price, maxPeople, desc, roomNumbers, hotelId } = req.body;
  const newRoom = new Room({ title, price, maxPeople, desc, roomNumbers });
  newRoom
    .save()
    .then((room) => {
      Hotel.find({ _id: hotelId }).then((hotel) => {
        hotel.updateOne({ $set: { rooms: [...hotel.rooms, room._id] } });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get All transaction with page?
exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .then((transactions) => {
      res.send(transactions);
    })
    .catch((err) => {
      console.log(err);
    });
};
