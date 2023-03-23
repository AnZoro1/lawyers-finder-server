const mongoose = require('mongoose')

const lawyersSchema = mongoose.Schema({
  lawyerName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  orders: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Order',
  },
})

const Lawyer = mongoose.model('Lawyer', lawyersSchema)
module.exports = Lawyer
