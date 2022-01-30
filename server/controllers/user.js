// const db = require('../config/db')

const User = require("../models/user")


// @route       GET /api/v1/user
// @desc        That controller gets all blogs from the database 
// Public
exports.getUsers = (req, res, next) => {
    User.getAllUser(res)
}
// @route       GET /api/v1/user/:id
// @desc        That controller gets user with id from the database 
// Public
exports.getSingleUserById = (req, res, next) => {
    return res.status(200).json({
        status: true,
        message: "Testing User Route"
    })
}
// @route       POST /api/v1/user
// @desc        That controller creates the user
// Public
exports.createUser = (req, res, next) => {
    const { username, email, password } = req.body
    const user = new User(username, email, password)
    user.createUser(res)
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