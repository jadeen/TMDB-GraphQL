require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const { typeDefs } = require('./src/types');
const { resolvers } = require('./src/resolvers');

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: true
});
const expressLogger = expressPino({ logger });

const app = express();

app.use(expressLogger);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen({ port: process.env.APP_PORT }, () =>
  logger.info(
    `🚀 Server ready at http://localhost:${process.env.APP_PORT}${
      server.graphqlPath
    }`
  )
);
