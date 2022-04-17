const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('Story', StorySchema)