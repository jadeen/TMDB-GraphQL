const search = require('./search');
const movies = require('./movies');

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
  PageResponse: resolveType,
  Movie: movies.Movie
};

module.exports = {
  resolvers
};
