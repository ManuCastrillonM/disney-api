const url = require('url');
const { searchParamsToRegexQuery } = require('../utils');

const getAll = (model) => async (req, res) => {
  try {
    const PAGE_SIZE = 50;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * PAGE_SIZE;

    const items = await model
      .find()
      .select(
        '_id name imageUrl url films shortFilms tvShows videoGames parkAttractions allies enemies'
      )
      .skip(skip)
      .limit(PAGE_SIZE);

    if (!items) {
      res.status(400).end();
    }

    const totalDocuments = await model.estimatedDocumentCount();
    const totalPages = Math.ceil(totalDocuments / PAGE_SIZE);

    let itemsRes = {
      data: items,
      count: items.length,
      totalPages: totalPages
    };

    if (page > 1) {
      itemsRes.previousPage = `https://api.disneyapi.dev${
        req.route.path
      }?page=${page - 1}`;
    }

    if (page < totalPages) {
      itemsRes.nextPage = `https://api.disneyapi.dev${req.route.path}?page=${
        page + 1
      }`;
    }

    res.status(200).json(itemsRes);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const getOneById = (model) => async (req, res) => {
  try {
    const item = await model
      .findById(req.params.id)
      .select(
        '_id name imageUrl url films shortFilms tvShows videoGames parkAttractions allies enemies'
      )
      .lean()
      .exec();

    if (!item) {
      res.status(400).end();
    }
    res.status(200).json(item);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const filterCharacter = (model) => async (req, res) => {
  const searchParamsRegexQuery = searchParamsToRegexQuery(req.query);

  try {
    const item = await model
      .find(searchParamsRegexQuery)
      .select(
        '_id name imageUrl url films shortFilms tvShows videoGames parkAttractions allies enemies'
      )
      .lean()
      .exec();

    const itemRes = {
      count: item.length,
      data: item
    };

    res.status(200).json(itemRes);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const crudController = (model) => ({
  filterCharacter: filterCharacter(model),
  getAll: getAll(model),
  getOneById: getOneById(model)
});

module.exports = crudController;
