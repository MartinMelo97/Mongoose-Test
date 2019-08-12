const express = require('express')
const mongoose = require('mongoose')
const http = require('http')

// Connecting to mongo db
mongoose.connect(
    'mongodb://localhost:27017/test_local',
    { useNewUrlParser: true, useFindAndModify: false }
)
    .then(connection => {
        console.log(`Connected to Mongo Database "${connection.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connection database', err)
    })

const app = express()
app.use(express.json())

//Routes
const userRoutes = require('./routes/userRouter')
app.use('/users', userRoutes)

const server = http.createServer(app)
const PORT = 5000

server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})