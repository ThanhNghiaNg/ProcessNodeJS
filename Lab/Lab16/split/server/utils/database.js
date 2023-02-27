const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://owwibookstore:owwibookstore@cluster0.o5luvip.mongodb.net/TestProduct?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      db = client.db();
      callback(client)
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDB = () => {
  if (db) {
    return db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
