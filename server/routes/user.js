const express = require('express')
const { getAllUsers, getSingleUser, createUser, changeUser, deleteUser } = require('../controllers/user')

const router = express.Router()

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getSingleUser)
    .put(changeUser)
    .delete(deleteUser)

router.use((req, res, next) => {
    res.status(404).json({ status: false, message: 'Page not found' })
})
module.exports = router