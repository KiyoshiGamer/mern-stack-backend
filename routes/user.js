const express = require('express')

const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()


// router.post() handles http request
router.post('/login', loginUser)

router.post('/signup', signupUser)

module.exports = router