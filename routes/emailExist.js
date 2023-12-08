var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/email-exist', function(req, res, next) {
  return res.render('emailExist');
});

module.exports = router;
