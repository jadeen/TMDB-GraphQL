const { gql } = require('apollo-server-express');

const search = require('./search');
const movie = require('./movies');
const list = require('./lists');
const authentication = require('./authentication');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

const root = gql`
  type Query {
    root: String
  }
`;

const typeDefs = [root, ...search, movie, list, authentication];

module.exports = { typeDefs };
