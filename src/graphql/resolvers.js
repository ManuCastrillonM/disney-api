const Character = require('../models/Character');

// Return a single character (based on id)
const getCharacter = async function (args) {
  const item = await Character.findById(args._id).select().lean().exec();
  return item;
};

// Return a list of characters
const getCharacters = async function (args) {
  const items = await Character.find().select().lean().exec();
  return items;
};

// Root resolver
const resolvers = {
  character: getCharacter,
  characters: getCharacters
};

module.exports = resolvers;
