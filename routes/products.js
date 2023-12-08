var express = require('express');
var router = express.Router();
const ProductModel = require('../models/ProductModel')
/* GET home page. */
router.get('/', async (req, res,) => {

    try {
        let products = await ProductModel.find()
        products.forEach(product => {
            console.log("Product Image:", product.image);

        });
        return res.render('products', {
            products: products
        })

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
