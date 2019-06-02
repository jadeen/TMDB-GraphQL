const axios = require('axios');

const { TMDB_URL } = process.env;

const url = `${TMDB_URL.replace('3', '4')}/account`;

const generateHeaders = identity_token => ({
  Authorization: `Bearer ${identity_token}`
});

module.exports = {
  query: {
    accountLists: async (_parent, { account_id }, { headers }) => {
      try {
        const response = await axios.get(`${url}/${account_id}/lists`, {
          headers
        });

        return response.data;
      } catch (e) {
        return e.response.data;
      }
    },
    accountFavoriteMovies: async (_parent, { account_id }, { headers }) => {
      try {
        const response = await axios.get(
          `${url}/${account_id}/movie/favorites`,
          { headers }
        );

        return response.data;
      } catch (e) {
        return e.response.data;
      }
    },
    accountMovieRecommendations: async (
      _parent,
      { account_id },
      { headers }
    ) => {
      try {
        const response = await axios.get(
          `${url}/${account_id}/movie/recommendations`,
          { headers }
        );

        return response.data;
      } catch (e) {
        return e.response.data;
      }
    },
    accountMovieWatchList: async (_parent, { account_id }, { headers }) => {
      try {
        const response = await axios.get(
          `${url}/${account_id}/movie/watchlist`,
          { headers }
        );

        return response.data;
      } catch (e) {
        return e.response.data;
      }
    },
    accountMovieRated: async (_parent, { account_id }, { headers }) => {
      try {
        const response = await axios.get(`${url}/${account_id}/movie/rated`, {
          headers
        });

        return response.data;
      } catch (e) {
        return e.response.data;
      }
    }
  }
};
