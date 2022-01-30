const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet')
dotenv.config({ path: './config/.env' })

// Get database
const db = require('./config/db')
db.connect(err => err ? console.log(err.message) : console.log('Connected Database'))

// Get routes
const blogRoute = require('./routes/blog')
const userRoute = require('./routes/user')


const app = express()
app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/blog', blogRoute)
app.use('/api/v1/user', userRoute)


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
