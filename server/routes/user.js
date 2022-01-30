const express = require('express')
const { getUsers, createUser, getSingleUserById, deleteUser, changeUser } = require('../controllers/user')
const router = express.Router()


router
    .route('/')
    .get(getUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getSingleUserById)
    .put(changeUser)
    .delete(deleteUser)


module.exports = router