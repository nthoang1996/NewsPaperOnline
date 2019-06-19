var express = require('express');
var productModel = require('../models/product.model');
var categoryModel = require('../models/category.model');

var router= express.Router();

router.get('/:id/products', (req,res, next)=>{
    var id = req.params.id;
    var page = req.query.page || 1;
    if(page < 1){
        page = 1;
    }
    var limit = 10;
    var offset = (page-1) * limit;
    let CatName;
    categoryModel.single(id)
    .then((category) => {
        if(category[0].is_dir){
            Promise.all([
                productModel.pageByParentCat(id, limit, offset),
                productModel.countByParentCat(id),
            ])
            .then(([rows, count_rows]) => {
                for (const c of res.locals.lcCategories){
                    if (c.ID === +id){
                        c.isActive = true;
                        CatName = c.Name;
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
                let firstProduct = rows[0];
                let listSecondProduct = [];
                for (let i = 1; i<4; i++){
                    listSecondProduct.push(rows[i]);
                }
                let listThirdProduct = [];
                for (let i =4 ;i<10; i++)
                {
                    listThirdProduct.push(rows[i]);
                }
                
                res.render('vwProducts/byCat', {
                    firstProduct: firstProduct,
                    listSecondProduct: listSecondProduct,
                    listThirdProduct: listThirdProduct,
                    CatName: CatName,
                    pages
                });
            })
            .catch(next);
        }else{
            Promise.all([
                productModel.pageByCat(id, limit, offset),
                productModel.countByCat(id),
            ])
            .then(([rows, count_rows]) => {
                for (const c of res.locals.lcCategories){
                    if (c.ID === +id){
                        c.isActive = true;
                        CatName = c.Name;
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
                let firstProduct = rows[0];
                let listSecondProduct = [];
                for (let i = 1; i<4; i++){
                    listSecondProduct.push(rows[i]);
                }
                let listThirdProduct = [];
                for (let i =4 ;i<10; i++)
                {
                    listThirdProduct.push(rows[i]);
                }
                
                res.render('vwProducts/byCat', {
                    firstProduct: firstProduct,
                    listSecondProduct: listSecondProduct,
                    listThirdProduct: listThirdProduct,
                    CatName: CatName,
                    pages
                });
            })
            .catch(next);
        }
    }).catch(next);
})

module.exports = router;