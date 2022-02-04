const Joi = require("joi");

exports.createBlogValidation = Joi.object({
    topic: Joi.string().required().min(3),
    blog: Joi.string().required().min(8)
})

exports.changeBlogValidation = Joi.object({
    topic: Joi.string().min(3),
    blog: Joi.string().min(8)
})