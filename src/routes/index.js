const router = require('express').Router()
const characterService = require('../services/character')

// /api/character
router.route('/character').get(characterService.getAll)

// /api/character/:id
router.route('/character/:id').get(characterService.getOneById)

module.exports = router
