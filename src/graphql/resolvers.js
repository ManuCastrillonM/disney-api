const character = require('../models/character');

// Return a single character (based on id)
const getCharacter = async function (args) {
  const item = await character.findById(args._id).select().lean().exec();
  return item;
};

// Return a list of characters
const getCharacterList = async function (args) {
  const PAGE_SIZE = 50;

  const page = args.page || 1;
  const skip = (page - 1) * PAGE_SIZE;
  const items = await character.find().select().skip(skip).limit(PAGE_SIZE);

  const totalDocuments = await character.estimatedDocumentCount();
  const totalPages = Math.ceil(totalDocuments / PAGE_SIZE);
  const paginationInfo = {
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    pageItemCount: items.length,
    totalPages: totalPages
  };

  return {
    items,
    paginationInfo
  };
};

// Get a character by name
const getCharacterByName = async function (args) {
  const item = await character
    .findOne({ name: args.name })
    .select()
    .lean()
    .exec();
  return item;
};

// Root resolver
const resolvers = {
  character: getCharacter,
  characters: getCharacterList,
  characterByName: getCharacterByName
};

module.exports = resolvers;
