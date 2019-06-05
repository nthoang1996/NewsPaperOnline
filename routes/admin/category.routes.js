var express = require('express');
var categoryModel = require('../../models/category.model');

var router= express.Router();

router.get('/', (req,res)=>{
    var p = categoryModel.all();
    p.then(rows => {
        res.render('admin/vwCategories/index', {
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/edit/:id', (req,res)=>{
    var id = req.params.id;
    categoryModel.single(id).then(rows => {
        if(rows.length>0){
            console.log('1');
            res.render('admin/vwCategories/edit', {
                error: false,
                categories: rows[0]
            });
        }else {
            console.log('2');
            res.render('admin/vwCategories/edit', {
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

router.get('/add', (req,res)=>{
    res.render('admin/vwCategories/add');
})

router.post('/add', (req,res)=>{
    // res.render('admin/vwCategories/add');
    // console.log(req.body);
    // res.end('...');
    var entity = {
        Name: req.body.cn
    }
    categoryModel.add(entity)
    .then(id => {
        res.render('admin/vwCategories/add');
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;