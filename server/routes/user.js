const express = require('express')
const { getAllUsers, getSingleUser, createUser, changeUser, deleteUser, followUser, unfollowUser } = require('../controllers/user')
const validate = require('../middleware/validation')
const auth = require('../middleware/auth')
const { registerValidation, changeUserInfoValidation } = require('../validations/user')

const router = express.Router()

router
    .route('/')
    .get(getAllUsers)
    .post(validate(registerValidation), createUser)

router
    .route('/:id')
    .get(getSingleUser)
    .put(auth, validate(changeUserInfoValidation), changeUser)
    .delete(deleteUser)

router
    .route('/:id/follow')
    .post(auth, followUser)
    .delete(auth, unfollowUser)
module.exports = router