const axios = require("axios");

const user_url = "http://localhost:4001/users/";

const userTypeDefs = `#graphql
  type User {
    _id: ID
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String
    address: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }
`;

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const { data } = await axios.get(user_url);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    user: async (_, { id }) => {
      try {
        const { data } = await axios.get(user_url + id);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
