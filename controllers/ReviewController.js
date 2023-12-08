const ReviewModel = require('../models/reviewModel')
const UserModel = require('../models/UserModel')
const ProductModel = require('../models/ProductModel')

const review = {}

// add review API

review.add = async (req, res) => {
    try {
        let data = req.body
        let userId = req.user.id
        let productId = req.params.productId
        let userCheck = await UserModel.findById(userId)
        if (!userCheck) {
            return res.send({ message: "Please login first or signUp! " })
        }
        let productCheck = await ProductModel.findById(productId)
        if (!productCheck) {
            return res.send({ message: "No such product exist" })
        }
        let exist = await ReviewModel.findOne({ user: userId, product: productId })
        if (exist) {
            return res.send({ message: "You have already provided the review Thank You!!" })
        }
        let save = await ReviewModel.create({ user: userId, product: productId, rating: data.rating, comment: data.comment })
        if (save) {
            res.send({ message: "Review added successfully", data: save })
        }
        else {
            res.send({ message: "Failed to add review " })
        }
    } catch (error) {
        console.log(error)
        res.send({ message: error.message })
    }
}

// get review details only Admin

review.get = async (req, res) => {
    try {
        if (req.user.role == 0) {
            return res.send({ message: "not allowed" })
        }
        let details = await ReviewModel.find().populate('user', 'userName Email password').populate('product', 'name brand availability')
        res.send(details)

    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

review.update = async (req, res) => {
    try {
        let data = req.body
        let reviewId = req.params.reviewId
        let exist = await ReviewModel.findById(reviewId)
        if (!exist) {
            return res.send({ message: "No such review exist" })
        }
        if (req.user.id != exist.user) {
            return res.send({ message: "You cannot modify tha review" })
        }
        let save = await ReviewModel.findByIdAndUpdate(reviewId, data, { new: true })
        if (save) {
            res.send({ message: "Review updated sucessfully", data: save })
        }
        else {
            res.send({ message: "Review cannot be updated" })
        }
    } catch (error) {
        console.log(error)

    }
}

review.delete = async (req, res) => {
    try {
        let reviewId = req.params.reviewId
        let exist = await ReviewModel.findByIdAndRemove(reviewId)
        if (exist) {
            res.send({ message: "Review deleted successfully" })
        }
        else {
            res.send({ message: "No such review exist" })
        }

    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}
module.exports = review