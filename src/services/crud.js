const { model } = require('../models/Character')

const getAll = (model) => async (req, res) => {
  try {
    const items = await model.find().lean().exec()

    if (!items) {
      res.status(400).end()
    }
    res.status(200).json(items)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

const getOneById = (model) => async (req, res) => {
  try {
    const item = await model.findById(req.params.id).lean().exec()

    if (!item) {
      res.status(400).end()
    }
    res.status(200).json(item)
  } catch (e) {
    console.log(e)
    res.status(400).end()
  }
}

const crudController = (model) => ({
  getAll: getAll(model),
  getOneById: getOneById(model)
})

module.exports = crudController
