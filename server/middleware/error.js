module.exports = (err, req, res, next) => {
    const status = err.statuscode ? err.statusCode : 500
    return res.status(status).json({
        status: false,
        message: err.message
    })
}