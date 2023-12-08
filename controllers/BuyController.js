const CartModel = require('../models/CartModel')
const UserModel = require('../models/UserModel')
const ProductModel = require('../models/ProductModel')
const BuyModel = require('../models/BuyModel')
const buy = {}

// Add Order

buy.add = async (req, res) => {
    try {
        let data = req.body
        let userId = req.user.id
        const cartCheck = await CartModel.find({ user: userId })
        let totalPrice = 0;
        if (cartCheck.length == 0) {
            return res.send({ message: "Cart is Empty" })
        }
        else {
            const orderItems = cartCheck.map(item => {
                totalPrice += item.price;
                return {
                    product: item.product,
                    quantity: item.quantity,
                    price: item.price
                };
            });
            let save = await BuyModel.create({
                user: userId,
                items: orderItems,
                address: data.address,
                deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // Set deliveredDate as 7 days from now
                total: totalPrice
            })
            if (save) {
                await CartModel.deleteMany({ user: userId });
                res.status(200).json({
                    message: "Order placed successfully",
                    order: save
                })
            }
            else {
                res.status.json({ message: "Order cannot be placed" })
            }
        }

    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })


    }
}

// view Order

buy.view = async (req, res) => {
    try {
        let userId = req.user.id
        let order = await BuyModel.findOne({ user: userId }).populate('items.product', '-brand -description -quantity -availability -category ')
        if (order) {
            res.status(200).json({ message: "Order details", info: order })
        }
        else {
            res.send({ message: "No order found" })
        }

    } catch (error) {

        console.log(error)
        return res.send({ message: error.message })
    }
}

// update Order only Admin

buy.update = async (req, res) => {
    try {
        let orderId = req.params.orderId
        if (req.user.role == 0) {
            return res.send({ message: "You cannot access this feature" })
        }
        let data = req.body
        let exist = await BuyModel.findById(orderId)

        if (!exist) {
            return res.send({ message: "No current  order exist" })
        }
        exist.status = data.status
        exist.save()
        res.send({ message: "Order updated successfully", exist })

    } catch (error) {
        console.log(error)
        return res.send({ message: error.messagen })

    }
}

// cancel order API

buy.delete = async (req, res) => {
    try {
        let userId = req.user.id
        let exist = await BuyModel.findOne({ user: userId })
        if (!exist) {
            return res.send({ message: "Sorry!  it seems like you have no current orders" })
        }
        exist.status = 'cancelled'
        exist.save()
        res.send({ message: "Your order is cancelled successfully" })

    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

// reorder API

buy.reorder = async (req, res) => {
    try {
        let orderId = req.params.orderId
        let exist = await BuyModel.findById(orderId)
        if (!exist) {
            res.send({ mtessage: "No order exist" })
        }
        else {
            if (req.user.id != exist.user) {
                return res.send({ message: "Invalid access" })
            }
            exist.status = 'pending'
            exist.orderDate = new Date()
            exist.deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            exist.save()
            res.send({ message: "Order confirmed", order: exist })

        }

    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

module.exports = buy

