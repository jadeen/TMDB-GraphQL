const { gql } = require('apollo-server-express');

module.exports = gql`
  type Genre {
    id: Int!
    name: String!
  }

  type ProductionCompany {
    id: Int!
    name: String!
    logo_path: String
    origin_country: String!
  }

  type ProductionCountry {
    iso_3166_1: String!
    name: String!
  }

  type SpokenLanguage {
    iso_639_1: String!
    name: String!
  }

  enum StatusMovie {
    Rumored
    Planned
    InProduction
    PostProduction
    Released
    Canceled
  }

  type MovieCast {
    cast_id: Int!
    character: String!
    credit_id: String!
    department: String!
    gender: Int
    id: Int!
    job: String!
    name: String!
    profile_path: String
  }

  type MovieCrew {
    credit_id: String!
    department: String!
    gender: Int
    id: Int!
    job: String!
    name: String!
    profile_path: String
  }

  type MovieCredit {
    id: Int
    cast: [MovieCast!]!
    crew: [MovieCrew!]!
  }

  type Movie {
    adult: Boolean!
    backdrop_path: String
    budget: Int
    credit: MovieCredit
    genres: [Genre!]!
    homepage: String
    id: Int!
    imdb_id: Int
    original_language: String!
    original_title: String!
    overview: String
    popularity: Int!
    poster_path: String
    productionCompanies: [ProductionCompany!]!
    productionCountries: [ProductionCountry!]!
    release_date: String!
    revenue: Int!
    runtime: Int
    spokenLanguages: [SpokenLanguage]
    status: StatusMovie!
    tagline: String
    title: String
    video: Boolean
    vote_average: Int!
    vote_count: Int!
  }

  extend type Query {
    getMovie(movie_id: Int!): Movie
  }
`;
