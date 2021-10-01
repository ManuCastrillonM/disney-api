const crudController = require('./crud');
const character = require('../models/character');

module.exports = crudController(character);
