const router = require('express').Router();
const characterService = require('../services/character');

const endpoints = {
  getAllCharacters: '/characters',
  getOneCharacter: '/characters/:id'
};

router.get('/', (req, res) => {
  res.json(endpoints);
});

router.get(endpoints.getAllCharacters, characterService.getAll);
router.get(endpoints.getOneCharacter, characterService.getOneById);

module.exports = router;
