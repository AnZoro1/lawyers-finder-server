const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const Client = require('../models/Client.model')

const ClientsController = {
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.find()
      res.json(clients)
    } catch (err) {
      return res.json({ error: err.message })
    }
  },

  registerClient: async (req, res) => {
    try {
      const { clientName, email, phoneNumber, password } = req.body
      const { BCRYPT_ROUNDS } = process.env
      const hash = await bcrypt.hash(password, Number(BCRYPT_ROUNDS))

      const client = await Client.create({
        clientName,
        email,
        phoneNumber,
        password: hash,
      })

      res.json(client)
    } catch (err) {
      return res.json({ error: err.message })
    }
  },

  loginClient: async (req, res) => {
    try {
      const { clientName, password } = req.body
      const { SECRET_JWT_KEY } = process.env

      const candidate = await Client.findOne({ clientName })

      if (!candidate) {
        return res
          .status(401)
          .json({ error: 'Неверный логин или пароль хахах' })
      }

      const valid = await bcrypt.compare(password, candidate.password)

      if (!valid) {
        return res.status(401).json({ error: 'Неверный пароль или пароль' })
      }

      const payload = {
        id: candidate._id,
        clientName: candidate.clientName,
      }

      const token = await jwt.sign(payload, SECRET_JWT_KEY, {
        expiresIn: '24h',
      })
      res.json({ token: token, client: candidate })
    } catch (err) {
      return res.json({ error: err.message })
    }
  },
}

module.exports = ClientsController
