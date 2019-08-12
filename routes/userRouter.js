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
        .catch(error => {
            res.status(400).json(error)
        })
})

//Create user
router.post('/', (req, res) => {
    const data = req.body
    userController.createUser(data)
        .then(response => {
            if(response.hasError) {
                res.status(400).json(response.error)
            }
            res.json(response)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

//Find One User
router.get('/:id', (req, res) => {
    userController.findOneUser(req.params.id)
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
router.put('/:id', (req, res) => {
    const { params, body } = req
    userController.updateUser(params.id, body)
        .then(result => {
            if (result.hasError) {
                res.status(400).json(result.error)
            }
            res.json(result)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

router.delete('/:id', (req, res) => {
    userController.deleteUser(req.params.id)
        .then(result => {
            if (result.hasError || result.ok === 0)
                res.status(400).json(result.error)
            res.json(result)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

module.exports = router