const express = require('express')

const authControllers = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', authControllers.signup)

router.post('/login', authControllers.login)

router.post('/logout', authControllers.logout)

module.exports = router