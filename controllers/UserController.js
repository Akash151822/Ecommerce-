const UserModel = require('../models/UserModel')
const ReviewModel = require('../models/reviewModel')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const nodemailer = require('../middlewares/nodemailer')
const user = {}

const otpGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

// signUp API

user.signUp = async (req, res) => {
    try {
        let data = req.body
        if (!(data.userName || data.Email || data.password)) {
            return res.send({ message: "Please provide necessary details , E-mail, userName and password for successful signUp" })
        }
        let exist = await UserModel.findOne({ Email: data.Email })
        if (exist) {
            res.redirect('/signup/email-exist')
        }
        else {
            let otp = otpGenerator();
            data.otp = otp
            data.otpExpires = new Date().getTime() + 5 * 60 * 1000
            data.password = await bcrypt.hash(data.password, parseInt(process.env.salt));
            const save = await UserModel.create(data)
            if (save) {
                await nodemailer.sendCountil(save.Email, save.userName, save.otp)
                res.redirect('/signup/verify-otp');
                // res.send({ message: "Done" })
            }
            else {
                res.send({ message: "User failed to signUp" })
            }
        }

    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })
    }
}

// verifyOtp  API

user.verifyOtp = async (req, res) => {
    try {
        let data = req.body
        if (!data.otp) {
            return res.send({ message: "Please Enter Otp" })
        }
        let exist = await UserModel.findOne({ otp: data.otp })
        if (!exist) {
            return res.status(400).send({ message: "Invalid Otp", type: "alert" })
        }
        else {
            let currentTime = new Date();
            if (currentTime >= exist.otpExpires) {
                return res.status(400).send({ message: " Otp expired", type: "alert" })
            }
            else if (data.otp != exist.otp) {
                return res.status(400).send({ message: "Invalid Otp", type: "alert" })
            }
            else {
                exist.verifyOtp = "true"
                exist.save()
                res.redirect('/signup/signup-success')
            }
        }

    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }
}

// login API

user.login = async (req, res) => {
    try {
        const data = req.body
        let exist = await UserModel.findOne({ Email: data.Email })
        if (exist) {
            let check = await bcrypt.compare(data.password, exist.password)
            if (check) {
                // const token = jwt.sign(id: exist._id , { process.env.PRIVATE_KEY })
                const payload = {
                    id: exist._id,
                    role: exist.role
                }
                const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '3h' })
                if (token) {
                    if (exist.Email == "Admin123@gmail.com") {
                        res.redirect('/adminPanel')
                    }
                    else {
                        res.redirect('/')
                    }
                }
                await nodemailer.loginEmail(exist.Email, exist.userName)

            }
            else {
                res.send({ message: "Invalid password" })
            }
        }
        else {
            res.send({ message: "No such user exist with this E-mail Id please signUp first" })
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }

}

// resendOtp API

user.resendOtp = async (req, res) => {
    try {
        let data = req.body
        if (!data.Email) {
            return res.send({ message: "Please enter E-mail Id for otp resend" })
        }
        let exist = await UserModel.findOne({ Email: data.Email })
        if (exist) {
            console.log(data.Email)
            let currentTime = new Date()
            if (currentTime < exist.otpExpires) {
                return res.send({ message: "Previous Otp is still valid", otp: exist.otp })
            }
            else {
                let otp = otpGenerator()
                exist.otp = otp
                exist.otpExpires = new Date().getTime() + 1 * 60 * 1000
                await exist.save()
                await nodemailer.resendOtp(save.Email, save.userName, save.otp)

                res.send({ message: `${otp} updated successfully and sent to ${data.Email}` })
            }
        }
        else {
            res.send({ message: "Invalid E-mail Id" })
        }

    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }
}

// forgot Password API

user.forgotPassword = async (req, res) => {
    try {
        let data = req.body
        let exist = await UserModel.findOne({ Email: data.Email })
        if (exist) {
            if (data.otp == exist.otp) {
                if (data.newPassword == data.confirmPassword) {
                    let pwd = await bcrypt.hash(data.newPassword, parseInt(process.env.salt))
                    data.newPassword = pwd
                    let upd = await UserModel.findOneAndUpdate({ Email: data.Email }, { password: data.newPassword }, { new: true })
                    if (upd) {
                        res.send({ message: "Password updated successfully" })
                    }
                    else {
                        res.send({ message: "Password cannot be updated at the momemnt" })
                    }
                }
                else {
                    res.send({ message: "Confirm password does not matches the new password" })
                }
            }
            else {
                res.send({ message: "Invalid Otp" })
            }
        }
        else {
            res.send({ message: "No such user exist with this E-mail Id" })
        }

    } catch (error) {
        console.log(error)
        return res.send({ message: error.message })

    }
}

// delete user

user.delete = async (req, res) => {
    try {
        let data = req.body
        let userId = req.user.id
        if (req.user.role == 0) {
            let del = await UserModel.findByIdAndRemove(userId)
            if (del) {
                await ReviewModel.deleteMany({ user: userId })
                res.send({ message: "User account deleted successfully" })
            }
            else {
                res.send({ message: "No such account exist" })
            }
        }
        else {
            let del = await UserModel.findOneAndDelete({ Email: data.Email })
            if (del) {
                res.send({ message: "Your account is deleted by the Admin" })
            }
            else {
                res.send({ message: "Account does not exist" })
            }
        }
    } catch (error) {
        console.log(error)

    }
}

// get all User details

user.getUsers = async (req, res) => {
    try {
        if (req.user.role == 0) {
            return res.send({ message: "You cannot access this feature" })
        }
        let exist = await UserModel.find()
        if (exist) {
            res.send({ message: "Here is the list", info: exist })
        }
        else {
            res.send({ message: "List is empty no user exist" })
        }

    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

// get details 

user.getInfo = async (req, res) => {
    try {
        let exist = await UserModel.findById(req.user.id)
        if (exist) {
            res.send({
                _id: exist._id,
                userName: exist.userName,
                Email: exist.Email,
                password: exist.password,
                role: exist.role
            })
        }
        else {
            res.send({ message: "No info exist" })
        }

    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}

// update user Info

user.updateUser = async (req, res) => {

    try {
        let data = req.body
        let exist = await UserModel.findById(req.user.id)
        if (exist) {
            let save = await UserModel.findByIdAndUpdate(req.user.id, data, { new: true })
            if (save) {
                res.send({ message: "User info updated successfully", updatedInfo: data })
            }
            else {
                res.send({ message: "info cannot be updated at the momemt" })
            }
        }
        else {
            res.send({ message: "No such user exist" })
        }

    } catch (error) {
        console.log(error)
        res.send({ message: error.message })

    }
}
// API for checking authentication

user.protected = async (req, res) => {
    res.send({
        message: "Protected data",
        user: req.user.id
    })
}
user.resendOtp
module.exports = user