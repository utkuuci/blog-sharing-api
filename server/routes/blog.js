const express = require('express')
const auth = require('../middleware/auth')
const { getSingleBlog, getAllBlogs, createBlog, deleteBlog, changeBlog } = require('../controllers/blog')

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

router.use((req, res, next) => {
    res.status(404).json({ status: false, message: 'Page not found' })
})
module.exports = router