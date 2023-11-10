const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { appTypeDefs, appResolvers } = require("./schema/app");
const { userTypeDefs, userResolvers } = require("./schema/user");

const server = new ApolloServer({
  typeDefs: [appTypeDefs, userTypeDefs],
  resolvers: [appResolvers, userResolvers],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
