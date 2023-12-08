const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    Email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        enum: [0, 1],  // 1 admin 0 user
        default: 0
    },
    otp: {
        type: String
    },
    verifyOtp: {
        type: String,
        enum: ['true', 'false'],
        default: 'false'
    },
    otpExpires: {
        type: Date
    }
})

module.exports = mongoose.model('User', userSchema)