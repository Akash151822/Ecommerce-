const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String
    },
    On: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true

    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'product',
        required: true

    }
})

module.exports = mongoose.model('Review', reviewSchema)