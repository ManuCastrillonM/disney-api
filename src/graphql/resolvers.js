const character = require('../models/character');
const { searchParamsToRegexQuery } = require('../utils');

// Return a single character (based on id)
const getCharacter = async function (args) {
  const item = await character.findById(args._id).select().lean().exec();
  return item;
};

// Return a list of characters
const getCharacterList = async function (args) {
  const { filter = {}, page = 1, pageSize = 50 } = args;

  const searchParamsRegexQuery = searchParamsToRegexQuery(filter);
  const skip = (page - 1) * pageSize;
  const items = await character
    .find(searchParamsRegexQuery)
    .select()
    .skip(skip)
    .limit(pageSize);

  const totalDocuments = await character.estimatedDocumentCount();
  const totalPages = Math.ceil(totalDocuments / pageSize);
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
