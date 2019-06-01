const axios = require('axios');
const logger = require('./../../logger');

const { TMDB_API_KEY, TMDB_URL } = process.env;

const url = `${TMDB_URL.replace('3', '4')}/list`;

const generateHeaders = identity_token => ({
  Authorization: `Bearer ${identity_token}`
});

module.exports = {
  query: {
    getList: async (_parent, args, { identity_token }) => {
      try {
        const response = await axios.get(`${url}/${args.list_id}`, {
          headers: generateHeaders(identity_token)
        });

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    checkItemStatus: async (
      _parent,
      { list_id, query: { media_id, media_type } },
      { identity_token }
    ) => {
      try {
        const _url = `${url}/${list_id}/item_status?media_id=${media_id}&media_type=${media_type}`;

        const response = await axios.get(_url, {
          headers: generateHeaders(identity_token)
        });

        return response.data;
      } catch (e) {
        if (e.status === 500) {
          logger.error(e.response.data.status_message);
        }

        return e.response.data;
      }
    }
  },
  mutation: {
    createList: async (_parent, args, { identity_token }) => {
      try {
        const response = await axios.post(
          `${url}?api_key=${TMDB_API_KEY}`,
          args.credentials,
          {
            headers: generateHeaders(identity_token)
          }
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    updateList: async (_parent, args, { identity_token }) => {
      try {
        const response = await axios.put(
          `${url}/${args.list_id}?api_key=${TMDB_API_KEY}`,
          { ...args.credentials },
          { headers: generateHeaders(identity_token) }
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    clearList: async (_parent, args, { identity_token }) => {
      try {
        const response = await axios.get(`${url}/${args.list_id}/clear`, {
          headers: generateHeaders(identity_token)
        });

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    deleteList: async (_parent, args, { identity_token }) => {
      try {
        const response = await axios.delete(`${url}/${args.list_id}`, {
          headers: generateHeaders(identity_token)
        });

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    addItemsList: async (_parent, args, { identity_token }) => {
      try {
        const response = await axios.post(
          `${url}/${args.list_id}/items?api_key=${TMDB_API_KEY}`,
          { ...args.credentials },
          {
            headers: generateHeaders(identity_token)
          }
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    updateItemsList: async (_parent, args, { identity_token }) => {
      try {
        const response = await axios.put(
          `${url}/${args.list_id}/items?api_key=${TMDB_API_KEY}`,
          { ...args.credentials },
          {
            headers: generateHeaders(identity_token)
          }
        );

        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    },
    removeItemsList: async (_parent, args, { identity_token }) => {
      try {
        const response = await axios.delete(
          `${url}/${args.list_id}/items?api_key=${TMDB_API_KEY}`,
          {
            data: {
              ...args.credentials
            },
            headers: generateHeaders(identity_token)
          }
        );
        return response.data;
      } catch (e) {
        logger.error(e.response.data.status_message);
      }
    }
  }
};
