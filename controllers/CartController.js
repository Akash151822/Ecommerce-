const CartModel = require('../models/CartModel')
const UserModel = require('../models/UserModel')
const ProductModel = require('../models/ProductModel')
const mongoose = require('mongoose')

const cart = {}

// Add  items in cart API

cart.add = async (req, res) => {
    try {
        let data = req.body
        let productId = data.product
        let userId = req.user.id
        let productCheck = await ProductModel.findById(productId)
        if (!productCheck) {
            return res.send({ message: "no such product exist" })
        }
        let userCheck = await UserModel.findById(userId)
        if (!userCheck) {
            return res.send({ message: "Login first to continue your shopping" })
        }
        let already = await CartModel.findOne({ user: userId, product: productId })
        if (already) {
            already.quantity = already.quantity + 1;
            let price = productCheck.price
            already.price = price * already.quantity
            already.save()
            return res.send({ message: "Product added successfully in the cart", cart: already })
        }
        if (productCheck.quantity == 0) {
            return res.send({ message: "The product is unavailable at the moment" })
        }
        else {
            let price = productCheck.price
            let save = await CartModel.create({ user: userId, product: productId, price: price })
            if (save) {
                res.send({ message: "Product added to the cart successfully", cart: save })
            }
            else {
                res.send({ message: "Product cannot be added to cart at the moment" })
            }
        }


    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

// update quantity 

cart.update = async (req, res) => {
    try {
        let data = req.body
        let productId = data.product
        let userId = req.user.id
        let productCheck = await ProductModel.findById(productId)
        let exist = await CartModel.findOne({ user: userId, product: productId })
        if (exist) {
            exist.quantity = exist.quantity + 1
            exist.price = productCheck.price * exist.quantity
            await exist.save()
            res.send({ message: "Cart updated successfully", cart: exist })
        }
        else {
            res.send({ message: "No product exist in the cart add to cart first" })
        }
    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

// delete all  Product from cart

cart.delete = async (req, res) => {
    try {
        let data = req.body
        let productId = data.product
        let userId = req.user.id
        let exist = await CartModel.find({ user: userId })
        if (exist.length != 0) {
            let del = await CartModel.deleteMany({ user: userId })
            if (del) {
                res.send({ message: "Cart delete successfully" })
            }
            else {
                res.send({ message: "Error Cart not removed" })
            }
        }
        else {
            res.send({ message: "No product exist in the cart" })
        }



    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

// delete one quantity of product

cart.deleteOne = async (req, res) => {
    try {
        let userId = req.user.id
        let productId = req.body.product
        let productCheck = await ProductModel.findById(productId)
        let exist = await CartModel.findOne({ user: userId, product: productId })
        if (exist) {
            exist.quantity = exist.quantity - 1
            exist.price = productCheck.price * exist.quantity
            await exist.save()
            if (exist.quantity <= 0) {
                await CartModel.findOneAndDelete(exist)
                return res.send({ message: "product removed  successfully" })
            }
            res.send({ message: "success", cart: exist })
        }
        else {
            res.send({ message: "No such cart exist" })
        }

    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

// view cart

cart.view = async (req, res) => {
    try {
        let userId = req.user.id
        const cartDetails = await CartModel.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "products",
                    localField: 'product',
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $group: {
                    _id: "$user",
                    items: {
                        $push: {
                            _id: "$productDetails._id",
                            name: "$productDetails.name",
                            quantity: "$quantity",
                            price: "$price",
                        },
                    },
                    grandTotal: { $sum: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    items: 1,
                    grandTotal: 1

                }
            }
        ])
        res.send(cartDetails)
    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }

}

module.exports = cart  