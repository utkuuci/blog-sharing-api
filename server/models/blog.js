const db = require('../config/db')
const ErrorHandler = require("./error")
module.exports = class Blog {
    constructor(topic, blog, username){
        this.topic = topic
        this.blog = blog
        this.username = username
    }
    static getAllBlogs(res, next){
        try{
            db.query('SELECT * FROM blog', function(err, result) {
                if(err) throw err
                if(!result.length) return next(new ErrorHandler('There is no blog', 404))
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
    static getSingleBlog(id, res, next) {
        try{
            db.query('SELECT * FROM blog WHERE id = ?', [id], function(err, result){
                if(err) throw err
                if(!result.length) return next(new ErrorHandler("Blog couldn't found"), 404)
                return res.status(200).json({
                    status: true,
                    data: result
                })
            })
        }
        catch(err){
            return next(err.message, 500)
        }
    }
    static changeBlog(id, data, res, next) {
        try{
            db.query('SELECT * FROM blog WHERE id = ?', [id], function(err, result) {
                if(err) next(err.message, 500)
                if(!result.length) return next(new ErrorHandler("Blog couldn't found", 404))
                if(data.belongsTo || data.createdAt || data.likes || data.unlikes) return next(new ErrorHandler("You can't change the blog that way", 400))
                result[0].topic = data.topic ? data.topic : result[0].topic
                result[0].blog = data.blog ? data.blog : result[0].blog
                db.query('UPDATE blog SET blog = ?, topic = ? WHERE id = ?', [result[0].blog, result[0].topic, id], function(err, result) {
                    if(err) next(err.message, 500)
                    return res.status(200).json({
                        status: true,
                        message: 'Blog updated'
                    })
                })
            })
            
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static deleteBlog(id, res, next) {  
        try {
            db.query('SELECT * FROM blog WHERE id = ?', [id], function(err, result){
                if(err) return next(err.message, 500)
                if(!result.length) return next(new ErrorHandler("Blog couldn't found", 404))
                db.query('DELETE FROM blog WHERE id = ?', [id], function(err, result) {
                    if(err) next(err.message, 500)
                    return res.status(200).json({
                        status: true,
                        data: result
                    })
                })
            })
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
    static createBlog(res, data, next){
        try{
            let newData = [data.topic, data.blog, data.belongsTo]
            db.query('SELECT * FROM user WHERE username = ?', [data.belongsTo], function(err, result) {
                if(err) return next(err.message, 500)
                if(!result.length) return next(new ErrorHandler("Couldn't find user", 400))
                db.query('INSERT INTO blog (topic, blog, belongsTo) VALUES (?)', [newData], function(err, result){
                    if(err) return next(err.message, 500)
                    return res.status(200).json({
                        status: true
                    })
                })
            }) 
        }
        catch(err){
            return next(new ErrorHandler(err.message, 500))
        }
    }
}