const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: "product"
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number
    },
    total: {
        type: Number
    }
})
module.exports = mongoose.model('Cart', cartSchema)