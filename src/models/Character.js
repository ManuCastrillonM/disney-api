const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    specie: {
      type: String
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('character', characterSchema)
