var express = require('express');
var productModel = require('../models/product.model');

var router= express.Router();

router.get('/:id/products', (req,res)=>{
    var id = req.params.id;
    productModel.allByCat(id)
    .then(rows => {
        console.log(res.locals.lcCategories);
        res.render('vwProducts/byCat', {
            products: rows
        });
    }).catch(err => {
        console.log(err);
        res.end('error ocurred.');
    });
})

module.exports = router;