var express = require('express');
var productModel = require('../models/product.model');

var router= express.Router();

router.get('/:id/products', (req,res)=>{
    var id = req.params.id;
    var page = req.query.page || 1;
    if(page < 1){
        page = 1;
    }
    var limit = 6;
    var offset = (page-1) * limit;

    Promise.all([
        productModel.pageByCat(id, limit, offset),
        productModel.countByCat(id),
    ])
    .then(([rows, count_rows]) => {
        for (const c of res.locals.lcCategories){
            if (c.ID === +id){
                c.isActive = true;
            }
        }
        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);
        if(total % limit >0){
            nPages++;
        }
        var pages = [];
        for(i =1 ; i<= nPages; i++){
            var obj = {value: i, active: i === +page};
            pages.push(obj);
        }
        res.render('vwProducts/byCat', {
            products: rows,
            pages
        });
    })
    .catch(err => {})

    // productModel.pageByCat(id, limit, offset)
    // .then(rows => {
    //     for (const c of res.locals.lcCategories){
    //         if (c.ID === +id){
    //             c.isActive = true;
    //         }
    //     }
    //     res.render('vwProducts/byCat', {
    //         products: rows
    //     });
    // }).catch(err => {
    //     console.log(err);
    //     res.end('error ocurred.');
    // });

    // productModel.allByCat(id)
    // .then(rows => {
    //     for (const c of res.locals.lcCategories){
    //         if (c.ID === +id){
    //             c.isActive = true;
    //         }
    //     }
    //     res.render('vwProducts/byCat', {
    //         products: rows
    //     });
    // }).catch(err => {
    //     console.log(err);
    //     res.end('error ocurred.');
    // });
})

module.exports = router;