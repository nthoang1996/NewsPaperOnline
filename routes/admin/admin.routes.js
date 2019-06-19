var express = require('express');
var productModel = require('../../models/product.model');
var auth = require('../../middlewares/auth');

var router= express.Router();

router.get('/view_list_product', auth, (req,res, next)=>{
    productModel.all()
    .then((rows)=> {
        res.render('admin/list_product', {
            products: rows
        });
    }).catch(next);
})

module.exports = router;