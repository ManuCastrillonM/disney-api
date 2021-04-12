const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const characterSchema = new mongoose.Schema(
  {
    _id: Number,
    url: String,
    name: {
      type: String,
      required: true
    },
    sourceUrl: {
      type: String,
      required: true,
      unique: true
    },
    imageUrl: String,
    films: [String],
    shortFilms: [String],
    tvShows: [String],
    videoGames: [String],
    alignment: String,
    parkAttractions: [String],
    allies: [String],
    enemies: [String]
  },
  { id: false, timestamps: true }
)

characterSchema.plugin(AutoIncrement, {
  inc_field: '_id',
  parallel_hooks: false
})

characterSchema.pre('save', function (next) {
  const characterUrl = `https://api.disneyapi.dev/characters/${this._id}`
  this.url = characterUrl
  next()
})

module.exports = mongoose.model('character', characterSchema)
