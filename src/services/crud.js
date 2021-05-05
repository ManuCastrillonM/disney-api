const getAll = (model) => async (req, res) => {
  try {
    const PAGE_SIZE = 50;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * PAGE_SIZE;

    const items = await model.find().select().skip(skip).limit(PAGE_SIZE);

    if (!items) {
      res.status(400).end();
    }

    let itemsRes = {};
    itemsRes.data = items;
    itemsRes.count = items.length;

    if (page > 1) {
      itemsRes.previousPage = `https://api.disneyapi.dev${
        req.route.path
      }?page=${page - 1}`;
    }

    if (items.length == PAGE_SIZE) {
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
    const item = await model.findById(req.params.id).select().lean().exec();

    if (!item) {
      res.status(400).end();
    }
    res.status(200).json(item);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const crudController = (model) => ({
  getAll: getAll(model),
  getOneById: getOneById(model)
});

module.exports = crudController;
