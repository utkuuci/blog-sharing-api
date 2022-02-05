const User = require("../models/user")
const ErrorHandler = require('../helpers/error')
// @route       GET /api/v1/user
// @desc        That controller gets all users from the database 
// Public
exports.getAllUsers = (req, res, next) => {
    User.getUsers(res, next)
}
// @route       GET /api/v1/user/:id
// @desc        That controller gets single user from the database 
// Public       
exports.getSingleUser = (req, res, next) => {
    User.getSingleUser(req.params.id, res, next)
}
// @route       POST /api/v1/user
// @desc        That controller posts a new user to the database 
// Public
exports.createUser = (req, res, next) => {
    User.createUser(req.body, res, next)
}
// @route       PUT /api/v1/user/:id
// @desc        That controller cahnges user information from the database 
// Private
exports.changeUser = (req, res, next) => {
    if(req.user.id != req.params.id){
        return next(new ErrorHandler("You are not allowed to change user info fot other user", 400))
    }
    User.changeUser(req.params.id, req.body, res, next)
}
// @route       DELETE /api/v1/user/:id
// @desc        That controller deletes user from the database 
// Private      Just for admin role
exports.deleteUser = (req, res, next) => {
    User.deleteUser(req.params.id, res, next)
}

// @route       POST /api/v1/user/:id/follow
// @desc        That controller follows user
// Private
exports.followUser = (req, res, next) => {
    User.followUser(req.params.id, req.user.id, res, next)
}
// @route       DELETE /api/v1/user/:id/unfollow
// @desc        That controller unfollows user
// Private      
exports.unfollowUser = (req, res, next) => {
    User.unfollowUser(req.params.id, req.user.id, res, next)
}

exports.resetPassword = (req, res, next) => {
    User.resetPassword(req.body.email, res, next)
}