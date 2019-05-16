const { gql } = require('apollo-server-express');

module.exports = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  interface PageResponse {
    page: Int
    total_results: Int
    total_pages: Int
  }

  # This "Book" type can be used in other type declarations.
  type SearchMovie {
    poster_path: String
    adult: Boolean
    overview: String
    release_date: String
    genre_ids: String
    id: Int
    original_title: String
    original_language: String
    title: String
    backdrop_path: String
    popularity: Int
    vote_count: Int
    video: Boolean
    vote_average: Int
  }

  type SearchMovies implements PageResponse {
    page: Int
    results: [SearchMovie]
    total_results: Int
    total_pages: Int
  }

  input SearchMovieQuery {
    query: String
    language: String
    page: Int
    include_adult: Boolean
    region: String
    year: Int
    primary_release_year: Int
  }

  extend type Query {
    searchMovie(query: SearchMovieQuery): SearchMovies
  }
`;
