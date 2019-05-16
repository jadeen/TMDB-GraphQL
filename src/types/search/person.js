const { gql } = require('apollo-server-express');

module.exports = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type SearchPerson {
    profile_path: String
    adult: Boolean
    name: String
    popularity: Int
  }

  type SearchPersons implements PageResponse {
    page: Int
    results: [SearchPerson]
    total_pages: Int
    total_results: Int
  }

  input SearchPersonQuery {
    query: String
    language: String
    page: Int
    include_adult: Boolean
    region: String
  }

  extend type Query {
    searchPerson(query: SearchPersonQuery): SearchPersons
  }
`;
