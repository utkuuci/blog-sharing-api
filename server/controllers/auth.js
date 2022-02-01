const User = require("../models/user")

exports.login = (req, res, next) => {
    User.checkInformation(req.body, res, next)
    
}