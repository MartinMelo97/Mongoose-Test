const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        required: false
    },
    password: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)