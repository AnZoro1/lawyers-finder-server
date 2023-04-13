const Order = require('../models/Order.model')

const OrdersController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find()
      res.json(orders)
    } catch (err) {
      return res.json({ error: err.message })
    }
  },
  addOrder: async (req, res) => {
    try {
      const { topic, text, price, author } = req.body

      const order = await Order.create({
        topic,
        text,
        price,
        author,
      })

      res.json(order)
    } catch (err) {
      return res.json({ error: err.message })
    }
  },
}

module.exports = OrdersController
