const express = require('express')
const auth = require('../middleware/auth')
const { getSingleBlog, getAllBlogs, createBlog, deleteBlog, changeBlog, likeBlog, deleteLikeBlog } = require('../controllers/blog')

const router = express.Router()

router
    .route('/')
    .get(getAllBlogs)
    .post(auth, createBlog)

router
    .route('/:id')
    .get(getSingleBlog)
    .put(auth, changeBlog)
    .delete(auth, deleteBlog)

router
    .route('/:id/like')
    .post(auth, likeBlog)
    .delete(auth, deleteLikeBlog)

module.exports = router
