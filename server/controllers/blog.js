const Blog = require('../models/blog')


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
    Blog.getSingleBlog(id, res, next)
}
// @route       POST /api/v1/blog
// @desc        That controller posts the blog
// Private
exports.createBlog = (req, res, next) => {
    const { topic, blog, belongsTo } = req.body
    const newBlog = new Blog(topic, blog, belongsTo)
    newBlog.createBlog()

}
// @route       PUT /api/v1/blog/:id
// @desc        That controller updates the blog 
// Private
exports.changeBlog = (req, res, next) => {
    return res.status(201).json({
        status: true,
        message: 'Updating blog'
    })
}

// @route       DELETE /api/v1/blog/:id
// @desc        That controller deletes the blog
// Private
exports.deleteBlog = (req, res, next) => {
    return res.status(201).json({
        status: true,
        message: 'Deleting blog'
    })
}