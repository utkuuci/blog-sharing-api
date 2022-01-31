const db = require('../config/db')

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