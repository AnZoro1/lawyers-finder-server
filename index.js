const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(require('./routes/client.route'))
app.use(require('./routes/lawyer.route'))
app.use(require('./routes/order.route'))

const { PORT, MONGO_DB } = process.env

mongoose
  .connect(MONGO_DB)
  .then(() => {
    console.log('База подключена')
  })
  .catch((error) => {
    console.log(error.toString())
  })

const server = app.listen(PORT, (error) => {
  if (error) {
    return console.log(error.toString())
  }
  console.log(`Сервер запущен на порту ${PORT}`)
})
