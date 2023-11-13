const { MongoClient } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017";
const uri = "mongodb+srv://husein:dhvIacDjOo4PgXPR@cluster0.tkv05sk.mongodb.net/";
const client = new MongoClient(uri);

let db;

const connect = async () => {
  try {
    await client.connect();
    db = client.db("jobhubdb");

    const collections = await db.listCollections().toArray();
    const isUsersCollectionExists = collections.find((el) => el.name === "users") ? true : false;

    // Make a collection validators
    if (!isUsersCollectionExists) {
      const validator = {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["email", "password"],
            properties: {
              username: {
                bsonType: "string",
                description: "Username must be a string",
              },
              email: {
                bsonType: "string",
                description: "Email must be an valid email format and is required",
              },
              password: {
                bsonType: "string",
                minLength: 5,
                description: "Password must be a string with minimum length 5 and is required",
              },
              phoneNumber: {
                bsonType: "string",
                description: "Phone number must be a string",
              },
              address: {
                bsonType: "string",
                description: "Adress must be a string",
              },
            },
          },
        },
      };

      db.createCollection("users", validator);
    }
  } catch (error) {
    console.log(error);
  }
};

const getDb = () => {
  return db;
};

module.exports = { connect, getDb };
