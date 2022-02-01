const db = require('../config/db')
const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken')
class User {
    static getUsers(res, next){
        try{
            db.query('SELECT * FROM user', function(err, result) {
                if(err) return next()
                if(!result.length) return res.status(400).json({ status: false, message: "There is no user" })
                return res.status(200).json({
                    status: true,
                    count: result.length,
                    data: result
                })
            })
        }
        catch(err){
            return next()
        }
    }
    static getSingleUser(id, res, next){
        try{
            db.query("SELECT * FROM user WHERE id = ?", [id], function(err, result){
                if(err) return next()
                if(!result.length) return res.status(404).json({status: false, message: `User not found with that id ${id}`})
                return res.status(200).json({
                    status: true,
                    data: result[0]
                })
            })
        }
        catch(err){
            return next()
        }
    }
    static createUser(data, res, next){
        try{
            if(!data.username || !data.email || !data.password) return res.status(400).json({status: false, message: 'Please fill all blanks'})
            db.query('SELECT * FROM user WHERE username = ? OR email = ?', [data.username, data.email], async function(err, result) {
                if(err) return next()
                if(result.length > 0) return res.status(400).json({ status: false, message: "The User exist" })
                const hashedPassword = await bcrypt.hash(data.password, 10)
                db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)',[data.username, data.email, hashedPassword], function(err, result){
                    if(err) return next()
                    return res.status(200).json({
                        status: true,
                        message: "User created"
                    })
                })
            })
        }
        catch(err){
            return next()
        }
    }
    static changeUser(id, data, res, next){
        try{
            if(data.password){
                return res.status(400).json({
                    status: false,
                    message: "You can't change password for now"
                })
            }
            db.query('SELECT * FROM user WHERE id = ?', [id], function(err, result) {
                if(err) next()
                if(!result.length) return res.status(400).json({ status: false, message: `User not found with that id ${id}` })
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
            return next()
        }
    }
    static deleteUser(id, res, next){
        try{
            db.query('SELECT * FROM user WHERE id = ?', [id], function(err, result) {
                if(err) next()
                if(!result.length) {
                    return res.status(400).json({
                        status: false,
                        message: `User not found with that id ${id}`
                    })
                }
                db.query('DELETE FROM user WHERE id = ?', [id], function(err, result){
                    if(err) next()
                    return res.status(200).json({ status: true, message: 'User deleted' })
                }) 
            })
        }
        catch(err) { 
            return next() 
        }
    }
    static checkInformation(data, res, next){
        try{
            db.query('SELECT * FROM user WHERE username = ?', [data.username], async function(err, result) {
                if(err) next()
                if(result.length == 0) {
                    return res.status(404).json({
                        status: true,
                        message: "Username not found"
                    })
                }
                const isValid = await bcrypt.compare(data.password, result[0].password)
                if(isValid){
                    const accessToken = sign({username: data.username, id: result.id}, process.env.JWT_SECRET)
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
            next()
        }
    }
}
module.exports = User