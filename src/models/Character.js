const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const characterSchema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      unique: true
    },
    url: String,
    firstAppareance: Number,
    createdBy: [
      {
        type: String
      }
    ],
    species: String,
    gender: String,
    relatives: [String],
    sourceUrl: {
      type: String,
      unique: true
    },
    imageUrl: String
  },
  { id: false, timestamps: true }
)

characterSchema.plugin(AutoIncrement, {
  inc_field: '_id',
  parallel_hooks: false
})

characterSchema.pre('save', function (next) {
  console.log('THIS: ', this)

  const characterUrl = `https://api.disneyapi.dev/characters/${this._id}`
  this.url = characterUrl
  next()
})

module.exports = mongoose.model('character', characterSchema)
