const crudController = require('./crud')
const Character = require('../models/Character')

module.exports = crudController(Character)
