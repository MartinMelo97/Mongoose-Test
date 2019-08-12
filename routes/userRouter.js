const express = require('express')
const router = express.Router()
const User = require('../models/User')
const moment = require('moment')
const userController = require('../controllers/UserController')

//List Users
router.get('/', (req, res) => {
    userController.findUsers()
    .then(users => {
        res.json(users)
    })
})

//Create user
router.post('/', (req, res) => {
    const data = req.body
    const newUser = new User(data)
    newUser.save()
        .then(user => {
            console.log(user)
            res.json({ message: 'ok' })
        })
        .catch(error => {
            console.log(error)
            res.status(400).json(error)
        })
})

//Find One User
router.get('/:value', (req, res) => {
    let request = null
    if(req.query.attr) {
        request = userController.findOneUser(req.params.value, req.query.attr)
    } else {
        request = userController.findOneUser(req.params.value)
    }
    request
        .then(result => {
            if(result.hasError)
                return res.status(400).json(result.error)
            return res.json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })

})

//Update User
router.put('/:username', (req, res) => {
    User.findOneAndUpdate({
        username: req.params.username },
        req.body,
        { new: true }
    )
        .then(user => {
            res.json(user)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

router.delete('/:username', (req, res) => {
    const now = moment().format('YYYY-MM-DD hh:mm:ss')
    User.updateOne({
        username: req.params.username },
        { deletedAt: now }
    )
        .then(updated => {
                res.json({ message: 'ok', updated })
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

module.exports = router