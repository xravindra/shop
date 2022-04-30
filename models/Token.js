const mongoose = require('mongoose')
const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    trim: true,
  },
})

module.exports = mongoose.model('Token', TokenSchema)