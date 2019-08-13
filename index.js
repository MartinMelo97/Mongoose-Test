const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const http = require('http')
require('dotenv').config()
require('./utils/passport_config')(passport)

const port = process.env.PORT || 5000
const dbUrl = process.env.DB_URL || 'localhost:27017'
const dbCollection = process.env.DB_COLLECTION || 'test_local'

mongoose.connect(
    `mongodb://${dbUrl}/${dbCollection}`,
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
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

// Routes
const userRoutes = require('./routes/userRouter')
const authRoutes = require('./routes/authRouter')
app.use('/', authRoutes)

app.use('/users', //Path
    passport.authenticate('jwt', //Passport stategy
    { session: false }), //Session don't be kepts
    userRoutes //Routes file
)


const server = http.createServer(app)
server.listen(port, () => {
    console.log(`App running in port ${port}`)
})