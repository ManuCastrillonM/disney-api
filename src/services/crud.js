const { searchParamsToRegexQuery } = require('../utils');

const DEFAULT_PAGE_SIZE = 50;

async function getAllCharacters(model, pageSize, page) {
  const skip = (page - 1) * pageSize;

  const characters = await model
    .find()
    .select(
      '_id name imageUrl url films shortFilms tvShows videoGames parkAttractions allies enemies'
    )
    .skip(skip)
    .limit(pageSize);

  return characters;
}

async function getCharacterById(model, id) {
  const characters = await model
    .findById(id)
    .select(
      '_id name imageUrl url films shortFilms tvShows videoGames parkAttractions allies enemies'
    )
    .lean()
    .exec();

  return characters;
}

async function getCharacterByParams(model, searchParams) {
  const searchParamsRegexQuery = searchParamsToRegexQuery(searchParams);

  const characters = await model
    .find(searchParamsRegexQuery)
    .select(
      '_id name imageUrl url films shortFilms tvShows videoGames parkAttractions allies enemies'
    )
    .lean()
    .exec();

  return characters;
}

const getCharacter = (model) => async (req, res) => {
  const { filter = {}, page = 1, pageSize = DEFAULT_PAGE_SIZE } = req.query;
  const id = req.params.id;

  const pageInt = parseInt(page);
  const pageSizeInt = parseInt(pageSize);

  const info = {};
  const reqUrl = `${req.protocol}://${req.get('host')}${req.route.path}`;
  const searchQuery = id ? { _id: id } : searchParamsToRegexQuery(filter);
  const skip = (pageInt - 1) * pageSizeInt;

  const [items, totalDocumentsWithFilter] = await Promise.all([
    model
      .find(searchQuery)
      .select()
      .skip(skip)
      .limit(pageSizeInt)
      .lean()
      .exec(),
    model.countDocuments(searchQuery)
  ]);

  info.count = items.length || 1;
  info.totalPages = Math.ceil(totalDocumentsWithFilter / pageSize);
  info.previousPage =
    page > 1 ? `${reqUrl}?page=${pageInt - 1}&pageSize=${pageSize}` : null;
  info.nextPage =
    page < info.totalPages
      ? `${reqUrl}?page=${pageInt + 1}&pageSize=${pageSize}`
      : null;

  const resJson = {
    info,
    data: items.length > 1 ? items : items[0]
  };

  res.status(200).json(resJson);
};

const crudController = (model) => ({
  getCharacter: getCharacter(model)
});

module.exports = crudController;
