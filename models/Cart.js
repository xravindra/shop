const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    required: true,
    trim: true,
  },
})

module.exports = mongoose.model('Cart', CartSchema)