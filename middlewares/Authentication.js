const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            res.send({ message: "A token is required for authentication" })
        }
        else {
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
            req.user = decoded
            next();
        }
    } catch (error) {
        console.log(error)
        return res.send({ message: "Invalid token, Authentication failed" })

    }
}