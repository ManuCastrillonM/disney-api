const router = require('express').Router();
const characterService = require('../services/character');

const endpoints = {
  getAllCharacters: '/characters', // TODO: Deprecate
  getOneCharacterById: '/characters/:id', // TODO: Deprecate
  getCharacter: '/character',
  getCharacterById: '/character/:id'
};

router.get('/', (req, res) => {
  res.json(endpoints);
});

router.get(endpoints.getCharacter, characterService.getCharacter);
router.get(endpoints.getCharacterById, characterService.getCharacter);
router.get(endpoints.getAllCharacters, characterService.getAll);
router.get(endpoints.getOneCharacterById, characterService.getOneById);

module.exports = router;
