const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    character(_id: Int!): Character
    characterByName(name: String!): Character
    searchCharacterByName(name: String!): [Character]
    characters(
      page: Int,
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
