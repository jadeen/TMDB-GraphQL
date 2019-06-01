const search = require('./search');
const movies = require('./movies');
const lists = require('./lists');
const authentication = require('./authentication');

const resolveType = {
  __resolveType() {
    return null;
  }
};

const resolvers = {
  Query: {
    ...search,
    ...movies.resolvers,
    ...lists.query
  },
  Mutation: {
    ...lists.mutation,
    ...authentication.mutation
  },
  PageResponse: resolveType,
  Movie: movies.Movie,
  ...movies.enum
};

module.exports = {
  resolvers
};
