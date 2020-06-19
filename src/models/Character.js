const mongoose = require('mongoose')
const { Schema } = mongoose
const characterSchema = new Schema({
  id: Number,
  name: String
})

let Model = mongoose.model('Character', characterSchema)
// let newm = new  Model({ name: "mouse", id: 21 });
// newm.save(function(err, doc) {
//     if (err) return console.error(err);
//     console.log("Document inserted succussfully!");
//   });
module.exports = Model
