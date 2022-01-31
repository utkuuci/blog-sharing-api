const express = require('express')
const { getUsers, createUser, getSingleUserByUsername, deleteUser, changeUser } = require('../controllers/user')
const router = express.Router()


router
    .route('/')
    .get(getUsers)
    .post(createUser)

router
    .route('/:username')
    .get(getSingleUserByUsername)
    .put(changeUser)
    .delete(deleteUser)



module.exports = router