const db = require('../config/db')

class Blog {
    static getBlogs(res, next){
        try{
            db.query('SELECT * FROM blog', function(err, result) {
                if(err) return next()
                if(!result.length) return res.status(400).json({ status: false, message: "There is no blog" })
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
    static getSingleBlog(id, res, next){
        try{
            db.query("SELECT * FROM blog WHERE id = ?", [id], function(err, result){
                if(err) return next()
                if(!result.length) return res.status(404).json({status: false, message: `Blog not found with that id ${id}`})
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
    static createBlog(data, req, res, next){
        try{
            if(!data.topic || !data.blog) return res.status(400).json({status: false, message: 'Please fill all blanks'})
            db.query('INSERT INTO blog (topic, blog, belongsTo) VALUES (?, ?, ?)',[data.topic, data.blog, req.user.username], function(err, result){
                if(err) return next()
                return res.status(200).json({
                    status: true,
                    message: "Blog created"
                })
            })
        }
        catch(err){
            return next()
        }
    }
    static changeBlog(id, data, req, res, next){
        try{
            if(data.belongsTo){
                return res.status(400).json({
                    status: false,
                    message: "You can't change belongsTo that way"
                })
            }
            db.query('SELECT * FROM blog WHERE id = ?', [id], function(err, result) {
                if(err) next()
                if(!result.length) return res.status(400).json({ status: false, message: `Blog not found with that id ${id}` })
                if(result[0].belongsTo !== req.user.username){
                    // console.log(result.belongsTo, req.user.username)
                    return res.status(400).json({
                        status: false,
                        message: "Invalid Credantials"
                    })
                }
                const newTopic = data.topic ? data.topic : result[0].topic
                const newBlog = data.blog ? data.blog : result[0].blog
                db.query('UPDATE blog SET topic = ?, blog = ? WHERE id = ?', [newTopic, newBlog, id], function(err, result){
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
    static deleteBlog(id, req, res, next){
        try{
            db.query('SELECT * FROM blog WHERE id = ?', [id], function(err, result) {
                if(err) next()
                if(!result.length) {
                    return res.status(400).json({
                        status: false,
                        message: `Blog not found with that id ${id}`
                    })
                }
                if(result[0].belongsTo !== req.user.username){
                    return res.status(400).json({
                        status: false,
                        message: "Invalid Credantials"
                    })
                }
                db.query('DELETE FROM blog WHERE id = ?', [id], function(err, result){
                    if(err) next()
                    return res.status(200).json({ status: true, message: 'Blog deleted' })
                }) 
            })
        }
        catch(err) { 
            return next() 
        }
    }
    static likeBlog(id, userId, res, next){
        console.log(userId)
        try{
            db.query('SELECT * FROM blog WHERE id = ?', [id], function(err, result) {
                if(err) return next()
                if(!result.length) {
                    return res.status(404).json({
                        status: false,
                        message: "Blog couldn't found"
                    })
                }
                db.query('SELECT user_id, blog_id FROM like_blog WHERE user_id = ? AND blog_id = ?', [userId, id], function(err, result){
                    if(err) return next()
                    
                    if(!result.length){
                        db.query('INSERT INTO like_blog (user_id, blog_id) VALUES (?, ?)', [userId, id], function(err, result){
                            if(err) return next()
                            return res.status(200).json({
                                status: true,
                                message: "Blog liked"
                            })
                        })
                    }
                    else {
                        return next()
                    }
                })
            })
        }
        catch(err){
            return next()
        }
    }
    static unlikeBlog(id, userId, res, next){
        try{
            db.query('SELECT * FROM like_blog WHERE user_id = ? AND blog_id = ?', [userId, id], function(err, result){
                if(err) return next()
                if(!result.length){
                    return res.status(404).json({
                        status: false,
                        message: "Like couldn't found"
                    })
                }
                db.query('DELETE FROM like_blog WHERE user_id = ? AND blog_id = ?', [userId, id], function(err, result){
                    if(err) return next()
                    return res.status(200).json({
                        status: true,
                        message: 'Like deleted'
                    })
                })
            })
        }
        catch(err){
            return next()
        }
    }
}
module.exports = Blog