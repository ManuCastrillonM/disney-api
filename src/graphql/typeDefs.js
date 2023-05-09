const { buildSchema } = require('graphql');

const schema = buildSchema(`
  input CharacterFilterInput {
    id: Int
    name: String
    films: String
    shortFilms: String
    tvShows: String
    videoGames: String
    alignment: String
    parkAttractions: String
    allies: String
    enemies: String
  },
  type Query {
    characters(
      page: Int,
      pageSize: Int,
      filter: CharacterFilterInput,
    ): CharacterPage
  },
  type paginationInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    pageItemCount: Int!
    totalPages: Int!
  },  
  type Character {
    _id: Int
    url: String
    name: String
    sourceUrl: String
    imageUrl: String
    films: [String]
    shortFilms: [String]
    tvShows: [String]
    videoGames: [String]
    alignment: String
    parkAttractions: [String]
    allies: [String]
    enemies: [String]
  },
  type CharacterPage {
    items: [Character]
    paginationInfo: paginationInfo
  }
`);

module.exports = schema;
