module.exports = (err, req, res, next) => {
    console.log(err.code)
    res.status(500).json({
        status: false,
        message: err.message
    })
}