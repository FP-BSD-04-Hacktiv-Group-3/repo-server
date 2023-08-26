const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

const {
  typeDefs: profileTypeDefs,
  resolvers: profileResolvers,
} = require("./schemas/profile");

async function App() {
  const server = new ApolloServer({
    typeDefs: [profileTypeDefs, userTypeDefs],
    resolvers: [profileResolvers, userResolvers],
    introspection: true,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

App();
