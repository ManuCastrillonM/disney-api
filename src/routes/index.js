const router = require('express').Router()

const query = require('../services/character')

router.get('/character/', query.getById)

module.exports = router
