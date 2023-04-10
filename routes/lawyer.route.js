const { Router } = require('express')
const LawyerController = require('../controllers/lawyer.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()

router.get('/lawyers', authMiddleware, LawyerController.getAllLawyers)
router.patch('lawyers/:id', LawyerController.updateLawyer)
router.post('/authLawyer', LawyerController.lawyerRegister)
router.post('/loginLawyer', LawyerController.loginLawyer)

module.exports = router
