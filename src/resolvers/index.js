const search = require('./search');
const movies = require('./movies');
const authentication = require('./authentication');

const resolveType = {
  __resolveType() {
    return null;
  }
};

const resolvers = {
  Query: {
    ...search,
    ...movies.resolvers
  },
  Mutation: {
    ...authentication.mutation
  },
  PageResponse: resolveType,
  Movie: movies.Movie,
  ...movies.enum
};

module.exports = {
  resolvers
};
