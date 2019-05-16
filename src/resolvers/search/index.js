const axios = require('axios');

const queryStringify = args =>
  Object.keys(args).reduce((acc, key) => `${acc}&${key}=${args[key]}`, '');

const { TMDB_API_KEY, TMDB_URL } = process.env;

module.exports = {
  searchMovie: async (_parent, args) => {
    const query = queryStringify(args.query);

    const response = await axios.get(
      `${TMDB_API_KEY}/search/movie?api_key=${TMDB_URL}${query}`
    );

    return response.data;
  },
  searchPerson: async (_parent, args) => {
    const query = queryStringify(args.query);

    const response = await axios.get(
      `${TMDB_API_KEY}/search/person?api_key=${TMDB_URL}${query}`
    );

    return response.data;
  }
};
