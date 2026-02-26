// server.js
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const connectDB = require('./config/mongoose');
const config = require('./config/config');
const auth = require('./middleware/auth');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const seedCourses = require('./config/seedCourses');
require('./config/express');

async function startServerApp() {
  await connectDB();
  
await seedCourses();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: config.port },
    context: async ({ req }) => {
      const user = auth(req);
      return { user };
    }
  });

  console.log(`🚀 GraphQL Server ready at ${url}`);
}

startServerApp();