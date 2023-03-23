const { Router } = require('express')
const ClientsController = require('../controllers/client.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/clients', authMiddleware, ClientsController.getAllClients)
router.post('/auth', ClientsController.registerClient)
router.post('/login', ClientsController.loginClient)

module.exports = router
