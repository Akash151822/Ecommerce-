var express = require('express');
var router = express.Router();

const auth = require('../middlewares/Authentication')

const USERCONTROLLER = require('../controllers/UserController')
const PRODUCTCONTROLLER = require('../controllers/ProductController');
const REVIEWCONTROLLER = require('../controllers/ReviewController')
const CARTCONTROLLER = require('../controllers/CartController')
const BUYCONTROLLER = require('../controllers/BuyController')
/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// User APIS  

router.post('/signUp', USERCONTROLLER.signUp)
router.post('/verifyOtp', USERCONTROLLER.verifyOtp)
router.post('/login', USERCONTROLLER.login)
router.post('/resendOtp', USERCONTROLLER.resendOtp)
router.put('/forgotPassword', USERCONTROLLER.forgotPassword)
router.put('/updateUser', auth, USERCONTROLLER.updateUser)
router.delete('/deleteUser', auth, USERCONTROLLER.delete)
router.get('/getUsers', auth, USERCONTROLLER.getUsers)
router.get('/getInfo', auth, USERCONTROLLER.getInfo)
router.get('/protected', auth, USERCONTROLLER.protected)

// Product APIS

router.post('/product/add', PRODUCTCONTROLLER.add)
router.put('/product/update/:productId', auth, PRODUCTCONTROLLER.update)
router.delete('/product/delete/:productId', auth, PRODUCTCONTROLLER.delete)
router.get('/product/viewCategory', auth, PRODUCTCONTROLLER.viewCategory)
router.get('/product/view', auth, PRODUCTCONTROLLER.view)

// Review APIS

router.post('/review/add/:productId', auth, REVIEWCONTROLLER.add)
router.get('/review/get', auth, REVIEWCONTROLLER.get)
router.put('/review/update/:reviewId', auth, REVIEWCONTROLLER.update)
router.delete('/review/delete/:reviewId', auth, REVIEWCONTROLLER.delete)

// Cart APIS

router.post('/cart/add', auth, CARTCONTROLLER.add)
router.put('/cart/update', auth, CARTCONTROLLER.update)
router.delete('/cart/delete', auth, CARTCONTROLLER.delete)
router.delete('/cart/deleteOne', auth, CARTCONTROLLER.deleteOne)
router.get('/cart/view', auth, CARTCONTROLLER.view)

// purhcase API

router.post('/buy/add', auth, BUYCONTROLLER.add)
router.get('/buy/view', auth, BUYCONTROLLER.view)
router.put('/buy/update/:orderId', auth, BUYCONTROLLER.update)
router.delete('/buy/delete', auth, BUYCONTROLLER.delete)
router.post('/buy/reorder/:orderId', auth, BUYCONTROLLER.reorder)

module.exports = router;
