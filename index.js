require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply middlewares
  // The GraphQL endpoint will be available at /graphql
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
  );

  // Simple REST API endpoint to test .env
  app.get('/api/test-env', (req, res) => {
    res.json({
      message: 'Environment variable test',
      value: process.env.TEST_ENV_VAR || 'No value found from .env'
    });
  });

  app.listen(port, () => {
    console.log(`GraphQL Server is running on http://localhost:${port}/graphql`);
  });
}

startServer();
