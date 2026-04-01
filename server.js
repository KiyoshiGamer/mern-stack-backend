//
require('dotenv').config()

// require - import modules os we can use there functionalit
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


// setup express server, app is the object created from express()
const app = express()



app.options('*', cors({
  origin: 'https://mern-stack-frontend-alpha.vercel.app',
  credentials: true
}))
// middleware(built-in in express)
// parse incoming request bodies that are JSON and make them available as req.body
app.use(express.json())

// middleware - checkpoint before request reachest the route
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// this is a route
// handle GET request or requesting data, not sending data
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


// connect to db
// connect to db first before running the server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen to port 4000 for browser to know  which app is connecting
    app.listen(process.env.PORT,  () => {
    console.log('connected to database and listening on port', process.env.PORT)
})
})
.catch((error) => {
    console.log(error)
})

2