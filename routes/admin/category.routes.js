var express = require('express');
var categoryModel = require('../../models/category.model');

var router= express.Router();

router.get('/', (req,res)=>{
    categoryModel.all()
    then(rows => {
        res.render('admin/vwCategories/index', {
            categories: rows
        });
    }).catch(err => {
        console.log(err);
        res.end('error ocurred.');
    });
})

router.get('/edit/:id', (req,res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.render('admin/vwCategories/edit', {
            error: true
        });
    }

    categoryModel.single(id).then(rows => {
        if(rows.length>0){
            res.render('admin/vwCategories/edit', {
                error: false,
                categories: rows[0]
            });
        }else {
            res.render('admin/vwCategories/edit', {
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
        res.end('error ocurred.');
    });
})

router.get('/add', (req,res)=>{
    res.render('admin/vwCategories/add');
})

router.post('/add', (req,res)=>{
    categoryModel.add(req.body)
    .then(id => {
        res.render('admin/vwCategories/add');
    })
    .catch(err => {
        console.log(err);
        res.end('error ocurred.');
    })
})

router.post('/update', (req,res)=>{
    categoryModel.update(req.body)
    .then(n => {
        res.redirect('/admin/categories');
    })
    .catch(err => {
        console.log(err);
        res.end('error ocurred.');
    })
})

router.post('/delete', (req,res)=>{
    categoryModel.delete(req.body.ID)
    .then(n => {
        res.redirect('/admin/categories');
    })
    .catch(err => {
        console.log(err);
        res.end('error ocurred.');
    })
})

module.exports = router;