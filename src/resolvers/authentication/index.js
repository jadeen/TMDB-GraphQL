const axios = require('axios');
const logger = require('./../../logger');

const { TMDB_API_KEY, TMDB_URL, TMDB_ACCESS_TOKEN } = process.env;

const v4_url = TMDB_URL.replace('3', '4');

module.exports = {
  mutation: {
    createRequestToken: async (_parent, _args) => {
      try {
        const response = await axios.post(
          `${v4_url}/auth/request_token?api_key=${TMDB_API_KEY}`,
          {
            redirect_to: 'http://localhost:4200/approve'
          },
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
            }
          }
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    createAccessToken: async (_parent, args) => {
      try {
        const response = await axios.post(
          `${v4_url}/auth/access_token?api_key=${TMDB_API_KEY}`,
          { ...args.credentials },
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
            }
          }
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
        return {
          success: false
        };
      }
    }
  }
};
