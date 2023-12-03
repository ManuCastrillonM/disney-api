const router = require('express').Router();
const characterService = require('../services/character');

const endpoints = {
  getCharacter: '/character',
  getCharacterById: '/character/:id',
  getCharactersById: '/characters/:id'
};

router.get('/', (req, res) => {
  res.json(endpoints);
});

router.get(endpoints.getCharacter, characterService.getCharacter);
router.get(endpoints.getCharacterById, characterService.getCharacter);
router.get(endpoints.getCharactersById, characterService.getCharacter);

module.exports = router;
