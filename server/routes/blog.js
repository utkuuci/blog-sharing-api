const express = require('express')
const auth = require('../middleware/auth')
const { getSingleBlog, getAllBlogs, createBlog, deleteBlog, changeBlog, likeBlog, deleteLikeBlog } = require('../controllers/blog')
const validate = require('../middleware/validation')
const { createBlogValidation, changeBlogValidation } = require('../validations/blog')

const router = express.Router()

router
    .route('/')
    .get(getAllBlogs)
    .post(auth, validate(createBlogValidation), createBlog)

router
    .route('/:id')
    .get(getSingleBlog)
    .put(auth, validate(changeBlogValidation), changeBlog)
    .delete(auth, deleteBlog)

router
    .route('/:id/like')
    .post(auth, likeBlog)
    .delete(auth, deleteLikeBlog)

module.exports = router
