const express = require('express')
const { getAllUsers, getSingleUser, createUser, changeUser, deleteUser, followUser, unfollowUser } = require('../controllers/user')
const auth = require('../middleware/auth')
const router = express.Router()

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getSingleUser)
    .put(auth, changeUser)
    .delete(deleteUser)

router.post('/:id/follow', auth, followUser)
router.post('/:id/unfollow', auth, unfollowUser)
module.exports = router