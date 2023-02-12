const express = require('express')
const authControllers = require('../controllers/auth')
const route = express.Router()

route.post('/login', authControllers.postLogin)

route.post('/sign-up', authControllers.postSignUp)

module.exports = route