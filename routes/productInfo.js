var express = require('express');
var router = express.Router();
const ProductModel = require('../models/ProductModel')
/* GET home page. */
router.get('/:id', async (req, res,) => {

    try {
        let product = await ProductModel.findById(req.params.id)
        return res.render('productInfo', {
            product
        })

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
