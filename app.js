var express = require('express');
var path = require('path');
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signuprouter = require('./routes/signup')
var signupSuccessrouter = require('./routes/signupSuccess')
var loginrouter = require('./routes/login')
var emailExistrouter = require('./routes/emailExist')
var verifyOtprouter = require('./routes/verifyOtp');
var productsrouter = require('./routes/products');
var productInforouter=require('./routes/productInfo')
var AdminPanelRouter=require('./routes/AdminPanel')

var app = express()

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signuprouter)
app.use('/signup', signupSuccessrouter)
app.use('/login', loginrouter)
app.use('/signup', emailExistrouter)
app.use('/signup', verifyOtprouter)

app.use('/products', productsrouter)
app.use('/product',productInforouter)

app.use('/adminPanel',AdminPanelRouter)

module.exports = app;
