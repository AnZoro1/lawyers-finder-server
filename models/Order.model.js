const mongoose = require('mongoose')

const ordersSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    min: 50,
  },
  price: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Client',
  },
})

const Order = mongoose.model('Order', ordersSchema)

module.exports = Order
