const db = require('../config/db')

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
            db.query('SELECT * FROM user WHERE username = ? OR email = ?', [data.username, data.email], function(err, result) {
                if(err) return next()
                if(result.length > 0) return res.status(400).json({ status: false, message: "The User exist" })
                db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)',[data.username, data.email, data.password], function(err, result){
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
}
module.exports = User