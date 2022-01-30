const express = require('express')
const { getBlogs, createBlog, getSingleBlogById, changeBlog, deleteBlog } = require('../controllers/blog')
const router = express.Router()


router
    .route('/')
    .get(getBlogs)
    .post(createBlog)

router
    .route('/:id')
    .get(getSingleBlogById)
    .put(changeBlog)
    .delete(deleteBlog)

module.exports = router