if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { appTypeDefs, appResolvers } = require("./schema/app");
const { userTypeDefs, userResolvers } = require("./schema/user");

const server = new ApolloServer({
  typeDefs: [appTypeDefs, userTypeDefs],
  resolvers: [appResolvers, userResolvers],
  instropection: true,
});

server.applyMiddLeware({
  cors: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
