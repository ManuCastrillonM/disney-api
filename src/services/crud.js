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
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE, ...searchParams } = req.query;
  const pageInt = parseInt(page);
  const pageSizeInt = parseInt(pageSize);
  const searchId = req.params.id;
  const isFilterRequest = !searchId && Object.keys(searchParams).length > 0;

  let items,
    info = {};
  const resJson = { info };

  // Get character based on the given params
  if (searchId) {
    items = await getCharacterById(model, searchId);
  } else if (isFilterRequest) {
    items = await getCharacterByParams(model, searchParams);
  } else {
    items = await getAllCharacters(model, pageSizeInt, pageInt);

    const reqUrl = `${req.protocol}://${req.get('host')}${req.route.path}`;
    const totalDocuments = await model.estimatedDocumentCount();
    const totalPages = Math.ceil(totalDocuments / pageSizeInt);

    info.totalPages = totalPages;
    info.previousPage =
      page > 1 ? `${reqUrl}?page=${pageInt - 1}&pageSize=${pageSize}` : null;
    info.nextPage =
      page < totalPages
        ? `${reqUrl}?page=${pageInt + 1}&pageSize=${pageSize}`
        : null;
  }

  // If no items found, return 400
  if (!items || items.length === 0) {
    res.status(400).json({ error: 'No items found' });
    return;
  }

  // If items found, return 200
  resJson.data = items;
  info.count = items.length || 1;
  res.status(200).json(resJson);
};

const crudController = (model) => ({
  getCharacter: getCharacter(model)
});

module.exports = crudController;
