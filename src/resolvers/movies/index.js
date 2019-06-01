const axios = require('axios');
const logger = require('./../../logger');

const { TMDB_API_KEY, TMDB_URL } = process.env;

const url = `${TMDB_URL}/movie`;

module.exports = {
  enum: {
    VideoType: {
      TRAILER: 'Trailer',
      TEASER: 'Teaser',
      CLIP: 'Clip',
      FEATURETTE: 'Featurette',
      BEHIND_THE_SCENES: 'Behind the Scenes',
      BLOOPERS: 'Bloopers'
    },
    VideoSize: {
      PX_360: 360,
      PX_480: 480,
      PX_720: 720,
      PX_1080: 1080
    }
  },
  resolvers: {
    getMovie: async (_parent, args) => {
      const response = await axios.get(
        `${url}/${args.movie_id}?api_key=${TMDB_API_KEY}`
      );

      return response.data;
    },
    getRecommendedMovies: async (_parent, args) => {
      try {
        const response = await axios.get(
          `${url}/${
            args.movie_id
          }/recommendations?api_key=${TMDB_API_KEY}&page=${args.page}`
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    getSimilarMovies: async (_parent, args) => {
      try {
        const response = await axios.get(
          `${url}/${args.movie_id}/similar?api_key=${TMDB_API_KEY}&page=${
            args.page
          }`
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    getMovieReviews: async (_parent, args) => {
      try {
        const response = await axios.get(
          `${url}/${args.movie_id}/reviews?api_key=${TMDB_API_KEY}&page=${
            args.page
          }`
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    getMovieLists: async (_parent, args) => {
      try {
        const response = await axios.get(
          `${url}/${args.movie_id}/lists?api_key=${TMDB_API_KEY}&page=${
            args.page
          }`
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    getLastMovie: async (_parent, _args) => {
      try {
        const response = await axios.get(
          `${url}/latest?api_key=${TMDB_API_KEY}`
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    }
  },
  Movie: {
    credit: async (parent, _args) => {
      const response = await axios.get(
        `${url}/${parent.id}/credits?api_key=${TMDB_API_KEY}`
      );

      return response.data;
    },
    alternative_titles: async (parent, _args) => {
      const response = await axios.get(
        `${url}/${parent.id}/alternative_titles?api_key=${TMDB_API_KEY}`
      );

      return response.data.titles;
    },
    external_ids: async (parent, _args) => {
      try {
        const response = await axios.get(
          `${url}/${parent.id}/external_ids?api_key=${TMDB_API_KEY}`
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    image: async (parent, _args) => {
      const response = await axios.get(
        `${url}/${parent.id}/images?api_key=${TMDB_API_KEY}`
      );

      return response.data;
    },
    keywords: async (parent, _args) => {
      const response = await axios.get(
        `${url}/${parent.id}/keywords?api_key=${TMDB_API_KEY}`
      );

      return response.data.keywords;
    },
    release_dates: async (parent, _args) => {
      const response = await axios.get(
        `${url}/${parent.id}/release_dates?api_key=${TMDB_API_KEY}`
      );
      return response.data.results;
    },
    videos: async (parent, _args) => {
      const response = await axios.get(
        `${url}/${parent.id}/videos?api_key=${TMDB_API_KEY}`
      );
      return response.data.results;
    },
    translations: async (parent, _args) => {
      const response = await axios.get(
        `${url}/${parent.id}/translations?api_key=${TMDB_API_KEY}`
      );
      return response.data.translations;
    }
  }
};
