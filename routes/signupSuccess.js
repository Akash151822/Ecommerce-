var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/signup-success', function (req, res, next) {
  return res.render('signupSuccess')
});

module.exports = router;
