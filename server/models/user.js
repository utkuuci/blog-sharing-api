const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const uuid = require('uuid')
const db = require('../config/db')
const ErrorHandler = require("../helpers/error")
const eventEmitter = require('../events/eventEmitter')
class User {
    static getUsers(res, next){
        try{
            db.query('SELECT * FROM user', function(err, result) {
                if(err) return next(new ErrorHandler(err.message, 500))
                if(!result.length) return res.status(400).json({ status: false, message: "There is no user" })
                return res.status(200).json({
                    status: true,
                    count: result.length,
                    data: result
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static getSingleUser(id, res, next){
        try{
            db.query("SELECT * FROM user WHERE id = ?", [id], function(err, result){
                if(err) return next(new ErrorHandler(err.message, 500))
                if(!result.length) return res.status(404).json({status: false, message: `User not found with that id ${id}`})
                return res.status(200).json({
                    status: true,
                    data: result[0]
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static createUser(data, res, next){
        try{
            if(!data.username || !data.email || !data.password) return res.status(400).json({status: false, message: 'Please fill all blanks'})
            db.query('SELECT * FROM user WHERE username = ? OR email = ?', [data.username, data.email], async function(err, result) {
                if(err) return next(new ErrorHandler(err.message, 500))
                if(result.length > 0) return res.status(400).json({ status: false, message: "The User exist" })
                const hashedPassword = await bcrypt.hash(data.password, 10)
                db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)',[data.username, data.email, hashedPassword], function(err, result){
                    if(err) return next(new ErrorHandler(err.message, 500))
                    return res.status(200).json({
                        status: true,
                        message: "User created"
                    })
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static changeUser(id, data, res, next){
        try{
            db.query('SELECT * FROM user WHERE id = ?', [id], function(err, result) {
                if(err) return next(new ErrorHandler(err.message, 500))
                if(!result.length) return next(new ErrorHandler(`User not found with that id ${id}`, 404))
                const newEmail = data.email ? data.email : result[0].email
                const newUsername = data.username ? data.username : result[0].username
                db.query('UPDATE user SET email = ?, username = ? WHERE id = ?', [newEmail, newUsername, id], function(err, result){
                    if(err) return next()
                    return res.status(200).json({
                        status: true,
                        message: "Updated"
                    })
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static deleteUser(id, res, next){
        try{
            db.query('SELECT * FROM user WHERE id = ?', [id], function(err, result) {
                if(err) return next(new ErrorHandler(err.message, 500))
                if(!result.length) {
                    return res.status(400).json({
                        status: false,
                        message: `User not found with that id ${id}`
                    })
                }
                db.query('DELETE FROM user WHERE id = ?', [id], function(err, result){
                    if(err) return next(new ErrorHandler(err.message, 500))
                    return res.status(200).json({ status: true, message: 'User deleted' })
                }) 
            })
        }
        catch(err) { 
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static checkInformation(data, res, next){
        try{
            db.query('SELECT * FROM user WHERE username = ?', [data.username], async function(err, result) {
                if(err) return next(new ErrorHandler(err.message, 500))
                if(result.length == 0) {
                    return res.status(404).json({
                        status: true,
                        message: "Username not found"
                    })
                }
                const isValid = await bcrypt.compare(data.password, result[0].password)
                if(isValid){
                    const accessToken = sign({username: data.username, id: result[0].id}, process.env.JWT_SECRET)
                    const option = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                        httpOnly: true                        
                    }
                    return res.status(200).cookie('token', accessToken, option).json({
                        status:true,
                        message: "You logged in",
                        token: accessToken
                    })
                }
                else{
                    res.status(400).json({
                        status: false,
                        message: "Password is wrong"
                    })
                }
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static followUser(id, userId, res, next) {
        try{
            db.query('SELECT * FROM user WHERE id = ?', [id], function(err, result) {
                if(err) return next(new ErrorHandler(err.message, 500))
                if(!result.length) {
                    return res.status(404).json({
                        status: false,
                        message: "User couldn't found"
                    })
                }
                db.query('SELECT user_id, follow_id FROM follow_user WHERE user_id = ? AND follow_id = ?', [userId, id], function(err, result){
                    if(err) return next(new ErrorHandler(err.message, 500))
                    if(!result.length){
                        db.query('INSERT INTO follow_user (user_id, follow_id) VALUES (?, ?)', [userId, id], function(err, result){
                            if(err) return next(new ErrorHandler(err.message, 500))
                            return res.status(200).json({
                                status: true,
                                message: "User followed"
                            })
                        })
                    }
                    else {
                        return next(new ErrorHandler(err.message, 500))
                    }
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static unfollowUser(id, userId, res, next){
        try{
            db.query('SELECT * FROM follow_user WHERE user_id = ? AND follow_id = ?', [userId, id], function(err, result){
                if(err) return next(new ErrorHandler(err.message, 500))
                if(!result.length){
                    return res.status(404).json({
                        status: false,
                        message: "Follow couldn't found"
                    })
                }
                db.query('DELETE FROM follow_user WHERE user_id = ? AND follow_id = ?', [userId, id], function(err, result){
                    if(err) return next()
                    return res.status(200).json({
                        status: true,
                        message: 'Follow deleted'
                    })
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static resetPassword(email, res, next){
        try{
            db.query('SELECT * FROM user WHERE email = ?', [email], async function(err, result){
                if(err) return next(new ErrorHandler(err.message, 500))
                if(!result.length){
                    return res.status(404).json({
                        status: false,
                        message: "User couldn't found"
                    })
                }
                const new_password = uuid.v4()?.split('-')[0] || `usr-${new Date().getTime()}`
                eventEmitter.emit('send_email', {
                    to: email,
                    subject: "Resetting Password", 
                    html: `Talebiniz uzerine sifre sifirlama isleminiz gerceklesmistir <br> Giris Yaptiktan sonra sifrenizi degistirmeyi unutmayin <br> Sifreniz: <b>${new_password}</b>`,
                })
                const hashedPassword = await bcrypt.hash(new_password, 10)
                db.query('UPDATE user SET password = ? WHERE email = ?', [hashedPassword, email], function(err, result){
                    if(err) return next()
                    return res.status(200).json({
                        message: "Email sent",
                        password: new_password,
                        hashedPassword
                    })
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static getUserBlog(userId, res, next){
        db.query("SELECT * FROM user WHERE id = ?", [userId], function(err, result){
            if(err) return next(new ErrorHandler(err.message, 500))
            if(!result.length){
                return res.status(404).json({
                    status: false,
                    message: "User couldn't found"
                })
            }
            db.query("SELECT * FROM user INNER JOIN blog on user.username = blog.belongsTo WHERE user.id = ?", [userId], function(err, result){
                if(err) return next(new ErrorHandler(err.message), 500)
                if(!result.length){
                    return res.status(400).json({
                        status: false,
                        message: "Couldn't found the user's blogs"
                    })
                }
                return res.status(200).json({
                    status: true,
                    count: result.length,
                    data: result
                })
            })
        })
    }
    
}
module.exports = User