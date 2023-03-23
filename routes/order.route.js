const { Router } = require('express')
const OrdersController = require('../controllers/order.controller')
const router = Router()

router.post('/order', OrdersController.addOrder)

module.exports = router
