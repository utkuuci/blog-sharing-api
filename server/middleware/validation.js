const ErrorHandler = require('../helpers/error')
module.exports = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body)
    if(error){
        const errorMessage = error.details?.map(detail => detail.message).join(', ')
        return next(new ErrorHandler(errorMessage, 400))
    }
    Object.assign(req, value)
    return next()
}