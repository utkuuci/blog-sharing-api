const db = require('../config/db')
const bcrypt = require('bcryptjs')

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
            db.query('SELECT * FROM user WHERE username = ?', [username], function(err, results) {
                if(err) throw err
                return res.status(200).json({
                    status:true,
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