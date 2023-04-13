const Lawyer = require('../models/Lawyer.model')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

const LawyerController = {
  getAllLawyers: async (req, res) => {
    try {
      const lawyers = await Lawyer.find()
      res.json(lawyers)
    } catch (err) {
      return res.json({ error: err.message })
    }
  },
  lawyerRegister: async (req, res) => {
    try {
      const { lawyerName, email, phoneNumber, password } = req.body

      const { BCRYPT_ROUNDS } = process.env

      const hash = await bcrypt.hash(password, Number(BCRYPT_ROUNDS))

      const lawyer = await Lawyer.create({
        lawyerName,
        email,
        phoneNumber,
        password: hash,
      })
      res.json(lawyer)
    } catch (err) {
      return res.json({ error: err.message })
    }
  },
  loginLawyer: async (req, res) => {
    try {
      const { lawyerName, password } = req.body
      const { SECRET_JWT_KEY } = process.env
      const candidate = await Lawyer.findOne({ lawyerName })

      if (!candidate) {
        return res.status(401).json({ error: 'Неверный логин или пароль' })
      }

      const valid = await bcrypt.compare(password, candidate.password)

      if (!valid) {
        return res.status(401).json({ error: 'Неверный логин или пароль' })
      }

      const payload = {
        id: candidate._id,
        lawyerName: candidate.lawyerName,
      }

      const token = await jwt.sign(payload, SECRET_JWT_KEY, {
        expiresIn: '24h',
      })
      res.json({ token: token, lawyer: candidate, id: candidate._id })
    } catch (err) {
      return res.json({ error: err.message })
    }
  },

  updateLawyer: async (req, res) => {
    console.log(req.params.lawyerId, 'ccc')
    try {
      const lawyerWithOrder = await Lawyer.findByIdAndUpdate(
        req.params.lawyerId,

        { $push: { orders: req.body.id } },
        { new: true }
      )
      res.json(lawyerWithOrder)
    } catch (err) {
      return res.json({ error: err.message })
    }
  },
}

module.exports = LawyerController
