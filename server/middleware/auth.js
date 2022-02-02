const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(401).json({ status: false, message: "You are not allowed" })
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({
                status: false,
                message: 'Unvalid token'
            })
        }
        req.user = user
        next()
    })
}