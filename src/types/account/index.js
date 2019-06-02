const { gql } = require('apollo-server-express');

module.exports = gql`
  type AccountList {
    iso_639_1: String
    id: Int
    featured: Int
    description: String
    revenu: String
    public: Int
    name: String
    updated_at: String
    created_at: String
    sort_by: Int
    backdrop_path: String
    runtime: Int
    average_rating: Int
    iso_3166_1: String
    adult: Int
    number_of_items: Int
    poster_path: String
  }

  type Response401 {
    status_message: String
    error_message: String
    success: Boolean
    status_code: Int
  }

  type ErrorResponse {
    status_code: Int
    status_message: String
    success: Boolean
  }

  type AccountLists {
    page: Int!
    results: [AccountList]
    total_results: Int!
    total_pages: Int!
  }

  type Movies {
    page: Int!
    results: [Movie!]
    total_pages: Int!
    total_results: Int!
  }

  extend type Query {
    accountLists(account_id: String!): AccountLists
    accountFavoriteMovies(account_id: String!): Movies
    accountMovieRecommendations(account_id: String!): Movies
    accountMovieWatchList(account_id: String!): Movies
    accountMovieRated(account_id: String!): Movies
  }
`;
