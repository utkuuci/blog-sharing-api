const express = require('express')
const dotenv = require("dotenv")
const morgan = require('morgan')
const { default: helmet } = require('helmet')
dotenv.config({ path: "./config/.env" })

// Get db and connect Database
const db = require('./config/db')
db.connect(err => err ? console.log(err.message) : console.log("Connected to Database"))


// Routes
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

// Get Middleware
const errorMiddleware = require('./middleware/error')


const app = express()
app.use(express.json())

// Middlware
app.use(morgan('dev'))
app.use(helmet())

// Routes
app.use('/api/v1/user', userRoute)
app.use('/api/v1/blog', blogRoute)

// Error middleware
app.use(errorMiddleware)

app.listen(process.env.PORT, () => console.log("Server is running on 3000 portbrew install port"))