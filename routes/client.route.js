const { Router } = require('express')
const ClientsController = require('../controllers/client.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/clients', authMiddleware, ClientsController.getAllClients)
router.post('/authClient', ClientsController.registerClient)
router.post('/loginClient', ClientsController.loginClient)

module.exports = router
