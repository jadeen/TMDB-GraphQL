const axios = require('axios');

const { TMDB_API_KEY, TMDB_URL } = process.env;

module.exports = {
  resolvers: {
    getMovie: async (_parent, args) => {
      const response = await axios.get(
        `${TMDB_URL}/movie/${args.movie_id}?api_key=${TMDB_API_KEY}`
      );

      return response.data;
    }
  },
  Movie: {
    credit: async (parent, _args) => {
      const response = await axios.get(
        `${TMDB_URL}/movie/${parent.id}/credits?api_key=${TMDB_API_KEY}`
      );

      return response.data;
    }
  }
};
