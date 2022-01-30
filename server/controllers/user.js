// const db = require('../config/db')

const User = require("../models/user")


// @route       GET /api/v1/user
// @desc        That controller gets all blogs from the database 
// Public
exports.getUsers = (req, res, next) => {
    User.getAllUser(res, next)
}
// @route       GET /api/v1/user/:id
// @desc        That controller gets user with id from the database 
// Public
exports.getSingleUserById = (req, res, next) => {
    User.getSingleUser(req.params.id, res, next)
}
// @route       GET /api/v1/user/:user
// @desc        That controller gets user with username from the database 
// Public
exports.getSingleUserByUsername = (req, res, next) => {
    const username = req.params.user
    User.getSingleUserWithUsername(username, res, next)
}
// @route       POST /api/v1/user
// @desc        That controller creates the user
// Public
exports.createUser = (req, res, next) => {
    const { username, email, password } = req.body
    const user = new User(username, email, password)
    user.createUser(res, next)
}
// @route       PUT /api/v1/blog/:id
// @desc        That controller updates the user 
// Private
exports.changeUser = (req, res, next) => {
    return res.status(201).json({
        status: true,
        message: 'Updating user'
    })
}

// @route       DELETE /api/v1/blog/:id
// @desc        That controller deletes the user
// Private JUST FOR ADMIN ROLE
exports.deleteUser = (req, res, next) => {
    return res.status(201).json({
        status: true,
        message: 'Deleting user'
    })
}