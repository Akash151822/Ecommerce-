const mongoose = require('mongoose')

const prodcutSchema = mongoose.Schema({
    name: {
        type: String
    },
    brand: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    availability: {
        type: String,
        enum: ["Available", "Unavailable"],
        default: "Available"
    },
    image: [
        {
            img: {
                type: String
            }
        }
    ],
    category: {
        type: String
    }
})  
module.exports = mongoose.model('product', prodcutSchema)