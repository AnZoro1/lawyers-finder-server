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
  number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
})

const Lawyer = mongoose.model('Lawyer', lawyersSchema)
module.exports = Lawyer
