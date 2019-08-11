require('dotenv').config();

const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const express = require('express');

const { typeDefs } = require('./src/types');
const { resolvers } = require('./src/resolvers');

const logger = require('./src/logger');

const expressPino = require('express-pino-logger');

const expressLogger = expressPino({ logger });

const app = express();

app.use(expressLogger);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false }
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      console.log('token', token);
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    } else {
      return { headers: null };
    }
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
});

server.applyMiddleware({ app });

app.listen({ port: process.env.APP_PORT }, () =>
  logger.info(
    `🚀 Server ready at http://localhost:${process.env.APP_PORT}${
      server.graphqlPath
    }`
  )
);
