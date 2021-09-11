const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    character(_id: Int!): Character
    characters: [Character]
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
  }
`);

module.exports = schema;
