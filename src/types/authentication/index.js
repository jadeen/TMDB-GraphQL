const { gql } = require('apollo-server-express');

module.exports = gql`
  type RequestToken {
    success: Boolean
    expires_at: String
    request_token: String
  }

  type SessionReponse {
    success: Boolean
    account_id: String
    access_token: String
    status_code: Int
  }

  input SessionCredentials {
    request_token: String
  }

  extend type Mutation {
    createRequestToken: RequestToken
    createAccessToken(credentials: SessionCredentials): SessionReponse
  }
`;
