const express = require('express')
const {registerUser, authUser, searchUsers} = require('../controllers/userControllers')
const {protect} = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/').get(protect, searchUsers)
router.route('/').post(registerUser)
router.post('/login', authUser)

module.exports = router