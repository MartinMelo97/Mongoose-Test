const User = require('../models/User')
const moment = require('moment')

class UserController {

    findUsers() {
        return User.find({
            deletedAt: { $exists: false }
        })
            .then(users => { return users })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    findOneUser(id) {
        return User.findOne({_id: id})
            .then(user => {
                return user
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    createUser(body) {
        const newUser = new User(body)
        return newUser.save()
            .then(user => {
                return {
                    message: 'ok',
                    user
                }
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    updateUser(id, body) {
        return User.findByIdAndUpdate(id, body, {
            new: true
        })
            .then(user => {
                return {
                    message: 'ok',
                    user
                }
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    patchUser(id, body) {
        return User.findByIdAndUpdate(id, body, {
            new: true
        })
            .then(user => {
                return {
                    message: 'ok',
                    user
                }
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    //soft Delete
    deleteUser(id) {
        const now = moment().format('YYYY-MM-DD hh:mm:ss')
        return User.updateOne({_id: id}, {
            deletedAt: now
        })
            .then(result => {
                return result
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }
}

module.exports = new UserController()

