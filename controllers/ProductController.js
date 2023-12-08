const ProductModel = require('../models/ProductModel')

const multer = require('multer')
const fs = require('fs')
const dir = './uploads'

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, dir)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })

const uploads = multer({ storage: storage }).fields([{ name: "image" }])
const product = {}

// add Product  

product.add = async (req, res) => {
    try {
        // if (req.user.role == 0) {
        //     return res.send({ message: "You are not allowed to add any products" })
        // }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            })
        }
        uploads(req, res, async (err) => {
            if (err) {
                return res.send(err)
            }
            let data = req.body
            let arr = [];
            if (req.files.image) {
                req.files.image.map((e) => {
                    arr.push({ img: e.path })
                })
                data.image = arr;
            }
            let save = await ProductModel.create(data)
            if (save.quantity == 0) {
                save.availability = "Unavailable"
            }
            await save.save()
            if (save) {
                res.redirect('/')
            }
            else {
                res.send({ message: "Product cannot be added" })
            }
        })

    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }
}

// update API

product.update = async (req, res) => {
    try {
        if (req.user.role == 0) {
            return res.send({ message: "Sorry you are not allowed to access this section" })
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            })
        }
        uploads(req, res, async (err) => {
            if (err) {
                return res.send(err)
            }
            const productId = req.params.productId
            const data = req.body
            let exist = await ProductModel.findById(productId)
            if (exist) {
                if (exist?.image) {
                    exist.image.map((e) => {
                        if (fs.existsSync(e.img)) {
                            fs.unlinkSync(e.img)
                        }
                    })
                }
                let arr = [];
                if (req.files.image) {
                    req.files.image.map((e) => {
                        arr.push({ img: e.path })
                    })
                    exist.image = arr
                }
                let save = await ProductModel.findByIdAndUpdate(productId, data, { new: true })
                await exist.save()

                if (save) {
                    res.send({ message: "Product updated successfully" })
                }
                else {
                    res.status(404).send({ message: "error" })
                }
            }
            else {
                res.send({ message: "No such product exist in the system" })
            }
        })

    } catch (error) {
        console.log(
        )

    }
}

// delete API

product.delete = async (req, res) => {
    try {
        if (req.user.role == 0) {
            return res.send({ message: "You are not allowed to delete a product" })
        }
        uploads(req, res, async (err) => {
            if (err) {
                return res.send(err)
            }
            let productId = req.params.productId
            let data = req.body
            let exist = await ProductModel.findById(productId)
            if (exist) {
                if (exist.image) {
                    exist.image.map((e) => {
                        if (fs.existsSync(e.img)) {
                            fs.unlinkSync(e.img)
                        }
                    })
                }
                let del = await ProductModel.findByIdAndRemove(productId)
                if (del) {
                    res.send({ message: "Product deleted successfully" })
                }
                else {
                    res.send({ message: "Product cannot be deleted at the moment" })
                }
            }
            else {
                res.send({ message: "No such product exist in the system" })
            }

        })

    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }
}

// get by category API

product.viewCategory = async (req, res) => {
    try {
        let exist = await ProductModel.find({ category: req.body.category })
        if (exist) {
            res.send({ exist })
        }
        else {
            res.send({ message: "No product exist" })
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }
}

// getAll API

product.view = async (req, res) => {
    try {
        let exist = await ProductModel.find()
        if (exist) {
            res.send(exist)
        }
        else {
            res.send({ message: "No product exist" })
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }
}


module.exports = product