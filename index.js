require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const { typeDefs } = require('./src/types');
const { resolvers } = require('./src/resolvers');

const logger = require('./src/logger');

const expressPino = require('express-pino-logger');

const expressLogger = expressPino({ logger });

const app = express();

app.use(expressLogger);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    logger.info('authorization %s', req.headers.authorization);
    if (req.headers.authorization) {
      return { identity_token: req.headers.authorization.split(' ')[1] };
    } else {
      return { identity_token: null };
    }
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
