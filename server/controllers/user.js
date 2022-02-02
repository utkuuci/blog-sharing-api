const User = require("../models/user")
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
    
}
// @route       DELETE /api/v1/user/:id/unfollow
// @desc        That controller unfollows user
// Private      
exports.unfollowUser = (req, res, next) => {
    
}
