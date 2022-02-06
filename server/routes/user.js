const express = require('express')
const { getAllUsers, getSingleUser, createUser, changeUser, deleteUser, followUser, unfollowUser, resetPassword, getUserBlog } = require('../controllers/user')
const validate = require('../middleware/validation')
const auth = require('../middleware/auth')
const { registerValidation, changeUserInfoValidation, resetPasswordValidation } = require('../validations/user')

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
router.route('/reset-password').post(validate(resetPasswordValidation), resetPassword)
router.route('/:id/blogs').get(getUserBlog)
module.exports = router