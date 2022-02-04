const express = require('express')
const { login } = require('../controllers/auth')
const validate = require('../middleware/validation')
const { loginValidation } = require('../validations/user')
const router = express.Router()

router.post('/login', validate(loginValidation), login)

module.exports = router