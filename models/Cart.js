const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    trim: true,
    required: true,
  },
})

module.exports = mongoose.model('Cart', CartSchema)