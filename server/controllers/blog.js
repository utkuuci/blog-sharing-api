const Blog = require('../models/blog')
const User = require('../models/user')


// @route       GET /api/v1/blog
// @desc        That controller gets all blogs from the database 
// Public
exports.getBlogs = (req, res, next) => {
    Blog.getAllBlogs(res, next)
}
// @route       GET /api/v1/blog/:id
// @desc        That controller gets single blog with id from the database 
// Public
exports.getSingleBlogById = (req, res, next) => {
    Blog.getSingleBlog(req.params.id, res, next)
}
// @route       POST /api/v1/blog
// @desc        That controller posts the blog
// Private
exports.createBlog = (req, res, next) => {
    const { topic, blog, belongsTo } = req.body
    if(!topic || !blog || !belongsTo){
        return next(new ErrorHandler("Please fill all the blanks", 400))
    }
    Blog.createBlog(res, req.body, next)
}
// @route       PUT /api/v1/blog/:id
// @desc        That controller updates the blog 
// Private
exports.changeBlog = (req, res, next) => {
    Blog.changeBlog(req.params.id, req.body, res, next)
}

// @route       DELETE /api/v1/blog/:id
// @desc        That controller deletes the blog
// Private
exports.deleteBlog = (req, res, next) => {
    Blog.deleteBlog(req.params.id, res, next)
}