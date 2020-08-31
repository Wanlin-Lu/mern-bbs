const express = require('express')

const authControllers = require('../controllers/auth.controller')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.post('/signup', authControllers.signup)

router.post('/login', authControllers.login)

router.use(checkAuth)

router.post('/logout', authControllers.logout)

module.exports = router