const { Strategy, ExtractJwt } = require('passport-jwt')
require('dotenv').config()

const secret = process.env.JWT_SECRET || 'defaultSecret'
const User = require('../models/User')


const opts = { //Options object to passport to set how passport will get the JWT token for the request and the secret
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            User.findById(payload.id)
                .then(user => {
                    if(user) {
                        const { name, email, username } = user
                        return done(null, {
                            id: user._id,
                            name,
                            email,
                            username
                        })
                    }
                    return done(null, false)
                })
                .catch(error => {
                    console.error(error)
                })
        })
    )
}