const Blog = require("../models/blog")
// @route       GET /api/v1/blog
// @desc        That controller gets all blogs from the database 
// Public
exports.getAllBlogs = (req, res, next) => {
    Blog.getBlogs(res, next)
}
// @route       GET /api/v1/blog/:id
// @desc        That controller gets single blog from the database 
// Public 
exports.getSingleBlog = (req, res, next) => {
    Blog.getSingleBlog(req.params.id, res, next)
}
// @route       POST /api/v1/blog
// @desc        That controller posts a new blog to the database 
// Public
exports.createBlog = (req, res, next) => {
    Blog.createBlog(req.body, req, res, next)
}
// @route       PUT /api/v1/blog/:id
// @desc        That controller cahnges blog information from the database 
// Private
exports.changeBlog = (req, res, next) => {
    Blog.changeBlog(req.params.id, req.body, req, res, next)
}
// @route       DELETE /api/v1/blog/:id
// @desc        That controller deletes blog from the database 
// Private
exports.deleteBlog = (req, res, next) => {
    Blog.deleteBlog(req.params.id, req, res, next)
}

// @route       POST /api/v1/blog/:id/like
// @desc        That controller likes blog by user
// Private
exports.likeBlog = (req, res, next) => {
    Blog.likeBlog(req.params.id, req.user.id, res, next)
}

// @route       DELETE /api/v1/blog/:id/delete/like
// @desc        That controller delete like blog by user
// Private
exports.deleteLikeBlog = (req, res, next) => {
    Blog.unlikeBlog(req.params.id, req.user.id, res, next)
}

