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

    findOneUser(value, key = "_id") {
        let filter = {}
        filter[key] = value
        return User.findOne(filter)
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
}

module.exports = new UserController()

