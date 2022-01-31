const db = require('../config/db')
const bcrypt = require('bcryptjs')
const ErrorHandler = require('./error')
module.exports = class User {
    constructor(username, email, password){ 
        this.username = username
        this.email = email,
        this.password = password
    }
    static getAllUser(res, next){
        try{
            db.query('SELECT * FROM user', function(err, results) {
                if(err) throw err
                return res.status(200).json({
                    stauts: true,
                    data: results
                })
            })
        }
        catch(err){
            return res.status(400).json({
                status: false,
                message: err.message
            })
        }
    }
    static getSingleUser(username, res, next) {
        try{
            let userData
            db.query('SELECT * FROM user WHERE username = ?', [username], function(err, results) {
                
                if(err) throw err
                if(!results.length) {
                    return next(new ErrorHandler("User couldn't find", 404))
                }
                else {
                    return res.status(200).json({
                        status:true,
                        data: results
                    })
                }
            })
        }
        catch(err){
            next(new ErrorHandler(err.message, 400))
        }
    }
    static changeUser(username, data, res, next) {
        try{
            db.query('SELECT * FROM user WHERE username = ?', [username], function(err, result) {
                if(err) throw err
                if(!result.length){
                    return next(new ErrorHandler("User couldn't find", 404))
                }
                else {
                    const oldData = result[0]
                    if(data.password) return next(new ErrorHandler("You can't change password for now", 400))
                    oldData.email = data.email ? data.email : oldData.email
                    oldData.username = data.username ? data.username : oldData.username
                    db.query('UPDATE user SET username = ?, email = ? WHERE username = ?', [oldData.username, oldData.email, username], function(err, result) {
                        if(err) throw err
                        return res.status(200).json({
                            status: true,
                            data: oldData
                        })

                    })
                }
            })
            
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static deleteUser(username, res, next) {
        try{
            db.query('DELETE FROM user WHERE username = ?', [username], function(err, result) {
                if(err) throw err
                return res.status(200).json({
                    status: true,
                    data: result
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    async createUser(res, next){
        try{
            const hashedPassword = await bcrypt.hash(this.password, 10)
            let sql = 'INSERT INTO user (username, email, password) VALUES (?)'
            db.query(sql, [[this.username, this.email, hashedPassword]], function(err, result){
                if(err) throw err;
                return res.status(200).json({
                    status: true,
                    data: result
                })
            })
        }
        catch(err){
            res.status(400).json({
                status: false,
                message: err.message
            })
        }
    }
}