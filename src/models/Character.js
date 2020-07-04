const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema(
  {
    firstAppareance: {
      type: String
    },
    createdBy: {
      type: String
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    specie: {
      type: String
    },
    gender: {
      type: String
    },
    relatives: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'character'
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('character', characterSchema)
