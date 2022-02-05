const express = require('express')
const dotenv = require("dotenv")
const cors = require('cors')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const cookieParser = require('cookie-parser')
const eventFunc = require('./events')
dotenv.config({ path: "./config/.env" })

// Get db and connect Database
const db = require('./config/db')
db.connect(err => err ? console.log(err.message) : console.log("Connected to Database"))

eventFunc()

// Routes
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const authRoute = require('./routes/auth')

// Get Middleware
const errorMiddleware = require('./middleware/error')


const app = express()
app.use(express.json())


// Cors
app.use(cors({
    origin: `http://localhost:${process.env.PORT}`
}))

// For cookie
app.use(cookieParser())

// Middlware
app.use(morgan('dev'))
app.use(helmet())

// Routes
app.use('/api/v1/user', userRoute)
app.use('/api/v1/blog', blogRoute)
app.use('/api/v1/auth', authRoute)

// Error middleware
app.use(errorMiddleware)

app.listen(process.env.PORT, () => console.log("Server is running on 4000 port"))