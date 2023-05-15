const { searchParamsToRegexQuery } = require('../utils');

const DEFAULT_PAGE_SIZE = 50;

const getCharacter = (model) => async (req, res) => {
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE, ...filter } = req.query;
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

  info.count = items.length;
  info.totalPages = Math.ceil(totalDocumentsWithFilter / pageSize);
  info.previousPage =
    page > 1 ? `${reqUrl}?page=${pageInt - 1}&pageSize=${pageSize}` : null;
  info.nextPage =
    page < info.totalPages
      ? `${reqUrl}?page=${pageInt + 1}&pageSize=${pageSize}`
      : null;

  const resJson = {
    info,
    data: items.length > 1 ? items : items[0] || []
  };

  res.status(200).json(resJson);
};

const crudController = (model) => ({
  getCharacter: getCharacter(model)
});

module.exports = crudController;
