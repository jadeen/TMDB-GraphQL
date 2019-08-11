const { gql } = require('apollo-server-express');

module.exports = gql`
  type Creator {
    name: String
    username: String
    gravatar_hash: String
  }

  type List {
    description: String
    favorite_count: Int
    id: ID!
    total_results: Int
    iso_639_1: String
    list_type: String
    name: String
    poster_path: String
    results: [Movie]!
    page: Int!
    total_pages: Int!
    created_by: Creator
  }

  input ListCredentials {
    name: String!
    iso_639_1: String!
    description: String
    public: Boolean
    iso_3166_1: String
  }

  input UpdateListCredentials {
    name: String
    description: String
    public: Boolean
    sort_by: String
  }

  enum MediaType {
    movie
    tv
  }

  input ItemList {
    media_type: MediaType!
    media_id: Int!
  }

  input ItemsListCredentials {
    items: [ItemList]
  }

  input UpdateItemList {
    media_type: MediaType!
    media_id: Int!
    comment: String
  }

  input UpdateItemsListCredentials {
    items: [UpdateItemList]
  }

  type CreateResponse {
    status_message: String
    id: ID
    success: Boolean
    status_code: Int
  }

  type SuccessResponse {
    status_message: String
    success: Boolean
    status_code: Int
  }

  type ClearListResponse {
    items_deleted: Int
    status_message: String
    id: ID
    success: Boolean
    status_code: Int
  }

  type ItemListResponse {
    media_type: MediaType
    media_id: Int
    success: String
  }

  type ItemsListResponse {
    status_message: String
    results: [ItemListResponse]
    success: Boolean
    status_code: Int
  }

  type CheckItemStatusResponse {
    media_type: String
    success: Boolean
    status_message: String
    id: Int
    media_id: Int
    status_code: Int
  }

  input CheckItemStatusQuery {
    media_id: Int!
    media_type: MediaType!
  }

  extend type Query {
    getList(list_id: Int!, page: Int): List
    checkItemStatus(
      list_id: Int!
      query: CheckItemStatusQuery
    ): CheckItemStatusResponse
  }

  type Mutation {
    createList(credentials: ListCredentials): CreateResponse
    updateList(
      list_id: Int!
      credentials: UpdateListCredentials!
    ): SuccessResponse
    deleteList(list_id: Int!): SuccessResponse
    clearList(list_id: Int!): ClearListResponse
    addItemsList(
      list_id: Int!
      credentials: ItemsListCredentials
    ): ItemsListResponse
    updateItemsList(
      list_id: Int!
      credentials: UpdateItemsListCredentials
    ): ItemsListResponse
    removeItemsList(
      list_id: Int!
      credentials: ItemsListCredentials
    ): ItemsListResponse
  }
`;
