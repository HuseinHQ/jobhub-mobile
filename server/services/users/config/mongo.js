const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;

const connect = async () => {
  try {
    await client.connect();
    db = client.db("jobhubdb");
  } catch (error) {
    console.log(error);
  }
};

const getDb = () => {
  return db;
};

module.exports = { connect, getDb };
