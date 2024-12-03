const express = require('express')
const {getUserProfile,loginUser,createUser,addOrUpdateAddress} = require('../controllers/authController')
const router = express.Router()
router.post('/register',createUser)
router.post('/login',loginUser)
router.get('/:id',getUserProfile)
router.patch('/:id',addOrUpdateAddress)

module.exports = router