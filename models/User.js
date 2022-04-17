const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  mobile: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

module.exports = mongoose.model('User', UserSchema)