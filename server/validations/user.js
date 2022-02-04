const Joi = require("joi");

exports.registerValidation = Joi.object({
    username: Joi.string().required().min(3),
    email: Joi.string().email().required().min(8),
    password: Joi.string().required().min(8)
})

exports.loginValidation = Joi.object({
    username: Joi.string().required().min(3),
    password: Joi.string().required().min(8)
})

exports.changeUserInfoValidation = Joi.object({
    email: Joi.string().email().min(8),
    username: Joi.string().min(3),
    password: Joi.string().min(8)
})