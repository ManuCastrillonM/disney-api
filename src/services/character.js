const character = require('../models/Character')
const query = require("./facade")

const getById = async (req, res) => {
    console.log("asas")
  const data = await query.getByFilter(character, req)
  
  if (!data) {
    return res.status(status).json({ error })
  }

  return res.json(data)
}

module.exports = { getById }
