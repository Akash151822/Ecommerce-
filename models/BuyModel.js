const mongoose = require('mongoose')

const buySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: 'product'
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number
    },
    address: {
        type: String
    },
    status: {
        type: String,
        enum: ['shipped', 'pending', 'Deliverd', 'cancelled'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    }
})

module.exports = mongoose.model('Buy', buySchema)
