const character = require('../models/character');
const { searchParamsToRegexQuery } = require('../utils');

const getCharacters = async function (args) {
  const { filter = {}, page = 1, pageSize = 50 } = args;
  const { id, ...searchParams } = filter;
  const skip = (page - 1) * pageSize;
  const searchQuery = id ? { _id: id } : searchParamsToRegexQuery(searchParams);

  const [items, totalDocumentsWithFilter] = await Promise.all([
    character
      .find(searchQuery)
      .select()
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec(),
    character.countDocuments(searchQuery)
  ]);

  const totalPages = Math.ceil(totalDocumentsWithFilter / pageSize);
  const paginationInfo = {
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    pageItemCount: items.length,
    totalPages
  };

  return {
    items,
    paginationInfo
  };
};

// Root resolver
const resolvers = {
  characters: getCharacters
};

module.exports = resolvers;
