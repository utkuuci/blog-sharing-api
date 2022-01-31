const User = require("../models/user")


// @route       GET /api/v1/user
// @desc        That controller gets all blogs from the database 
// Public
exports.getUsers = (req, res, next) => {
    User.getAllUser(res, next)
}
// @route       GET /api/v1/user/:username
// @desc        That controller gets user with username from the database 
// Public
exports.getSingleUserByUsername = (req, res, next) => {
    User.getSingleUser(req.params.username, res, next)
}
// @route       POST /api/v1/user
// @desc        That controller creates the user
// Public
exports.createUser = (req, res, next) => {
    const { username, email, password } = req.body
    const user = new User(username, email, password)
    user.createUser(res, next)
}
// @route       PUT /api/v1/blog/:username
// @desc        That controller updates the user 
// Private
exports.changeUser = (req, res, next) => {
    const data = req.body
    User.changeUser(req.params.username, data, res, next)
}

// @route       DELETE /api/v1/blog/:username
// @desc        That controller deletes the user
// Private      JUST FOR ADMIN ROLE
exports.deleteUser = (req, res, next) => {
    User.deleteUser(req.params.username, res, next)
}