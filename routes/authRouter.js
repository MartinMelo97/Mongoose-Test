const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'defaultSecret'

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({
                    message:`El email ya es utilizado, intenta con otro`
                })
            } else {
                const newUser = new User(req.body)
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password,
                        salt,
                        (err, hash) => {
                            if(err) throw err
                            newUser.password = hash
                            newUser.save()
                                .then(user => {
                                    res.json(user)
                                })
                                .catch(err => {
                                    res.status(400)
                                    .json(error)
                                })
                        })
                })
            }
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email })
        .then(user => {
            if(!user) {
                return res.status(400)
                .json({
                    message: `El usuario no existe`
                })
            }
            bcrypt.compare(
                password,
                user.password
            ).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user._id,
                        username: user.username
                    }
                    jwt.sign(
                        payload,
                        secret,
                        { expiresIn: 36000 },
                        (err, token) => {
                            if(err) res.status(500)
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            })
                        }
                    )
                }
                else {
                    res.status(400).json({
                        message: `Usuario/Contraseña incorrecto/a`
                    })
                }
            })
        })
})

module.exports = router