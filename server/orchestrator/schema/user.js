const axios = require("axios");
const { GraphQLError } = require("graphql");

const user_url = "http://localhost:4001/users/";

const userTypeDefs = `#graphql
  type User {
    _id: ID
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String
    address: String,
    createdAt: String,
    updatedAt: String
  }

  type Message {
    message: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  input UserInput {
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: String
  }

  type Mutation {
    createUser(content: UserInput): Message,
    deleteUser(id: ID!): Message
  }
`;

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const { data } = await axios.get(user_url);
        return data;
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    user: async (_, { id }) => {
      try {
        const { data } = await axios.get(user_url + id);
        return data;
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
  },
  Mutation: {
    createUser: async (_, { content }) => {
      try {
        const { data } = await axios({
          method: "post",
          url: user_url,
          data: content,
        });

        return data;
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const { data } = await axios.delete(user_url + id);
        return data;
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
