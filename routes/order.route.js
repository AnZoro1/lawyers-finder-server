const { Router } = require('express')
const OrdersController = require('../controllers/order.controller')
const router = Router()

router.post('/addOrder', OrdersController.addOrder)
router.get('/getOrders', OrdersController.getAllOrders)

module.exports = router
