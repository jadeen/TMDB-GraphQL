const search = require('./search');
const movies = require('./movies');
const lists = require('./lists');
const authentication = require('./authentication');
const account = require('./account');

const resolvers = {
  Query: {
    ...search,
    ...movies.resolvers,
    ...lists.query,
    ...account.query
  },
  Mutation: {
    ...lists.mutation,
    ...authentication.mutation
  },
  Movie: movies.Movie,
  ...movies.enum
};

module.exports = {
  resolvers
};
