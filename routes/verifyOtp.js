var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/verify-Otp', function (req, res, next) {
    return res.render('verifyOtp')
});

module.exports = router;
