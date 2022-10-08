const router = require('express').Router();
const characterService = require('../services/character');

const endpoints = {
  getAllCharacters: '/characters',
  filterCharacter: '/character',
  getOneCharacterById: '/characters/:id'
};

router.get('/', (req, res) => {
  res.json(endpoints);
});

router.get(endpoints.filterCharacter, characterService.filterCharacter);
router.get(endpoints.getAllCharacters, characterService.getAll);
router.get(endpoints.getOneCharacterById, characterService.getOneById);

module.exports = router;
