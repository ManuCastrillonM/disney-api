const { searchParamsToRegexQuery } = require('../utils');

const DEFAULT_PAGE_SIZE = 50;

const getAll = (model) => async (req, res) => {
  try {
    const reqUrl = req.protocol + '://' + req.get('host') + req.route.path;
    const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
    const page = parseInt(req.query.page) || 1;

    const items = await getAllCharacters(model, pageSize, page);

    if (!items) {
      res.status(400).end();
    }

    const totalDocuments = await model.estimatedDocumentCount();
    const totalPages = Math.ceil(totalDocuments / pageSize);

    let itemsRes = {
      data: items,
      count: items.length,
      totalPages: totalPages,
      warning:
        '🚨 IMPORTANT: THIS ENDPOINT IS GOING TO BE DEPRECATED ON APRIL 30TH. PLEASE USE /character INSTEAD 🚨'
    };

    if (page > 1) {
      itemsRes.previousPage = `${reqUrl}?page=${page - 1}`;
    }

    if (page < totalPages) {
      itemsRes.nextPage = `${reqUrl}?page=${page + 1}`;
    }

    res.status(200).json(itemsRes);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const getOneById = (model) => async (req, res) => {
  try {
    const item = await getCharacterById(model, req.params.id);

    const itemRes = {
      item,
      warning:
        '🚨 IMPORTANT: THIS ENDPOINT IS GOING TO BE DEPRECATED ON APRIL 30TH. PLEASE USE /character INSTEAD 🚨'
    };
    if (!item) {
      res.status(400).end();
    }
    res.status(200).json(itemRes);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

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
  getAll: getAll(model),
  getOneById: getOneById(model),
  getCharacter: getCharacter(model)
});

module.exports = crudController;
