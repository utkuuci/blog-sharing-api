const express = require('express')
const { getSingleBlog, getAllBlogs, createBlog, deleteBlog, changeBlog } = require('../controllers/blog')

const router = express.Router()

router
    .route('/')
    .get(getAllBlogs)
    .post(createBlog)

router
    .route('/:id')
    .get(getSingleBlog)
    .put(changeBlog)
    .delete(deleteBlog)

router.use((req, res, next) => {
    res.status(404).json({ status: false, message: 'Page not found' })
})
module.exports = router