const { buildSchema } = require('graphql');
const { json } = require('express');
const { graphqlHTTP } = require('express-graphql');

const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config');
const router = require('../routes');

const Character = require('../models/Character');

var schema = buildSchema(`
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

// Return a single user (based on id)
const getCharacter = async function (args) {
  const item = await Character.findById(args._id).select().lean().exec();
  return item;
};

// Return a list of users (takes an optional shark parameter)
const getCharacters = async function (args) {
  const items = await Character.find().select().lean().exec();
  return items;
};

// Root resolver
var root = {
  character: getCharacter, // Resolver function to return user with specific id
  characters: getCharacters // Resolver function to return all users
};

module.exports = (app) => {
  mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`${err.message}`);
  });

  mongoose.connection.once('open', function () {
    console.log('DB connection Successful!');
  });

  app.use(morgan('dev'));
  app.use(cors());
  app.use(json());
  app.use('/', router);
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema, // Must be provided
      rootValue: root,
      graphiql: true // Enable GraphiQL when server endpoint is accessed in browser
    })
  );
};
