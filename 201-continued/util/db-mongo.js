const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

let db;

exports.mongoConnect = () => {
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      console.log("Connected to Database");
      df = client.db("nodeshop");
      callback();
    })
    .catch((err) => {
      console.log("Error in mongo Connect: ", err);
    });
};

exports.getDB = () => {
  if (db) {
    return db;
  }
  throw "No database found";
};
