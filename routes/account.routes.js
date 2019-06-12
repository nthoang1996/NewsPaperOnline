var express = require('express');
var productModel = require('../models/product.model');

var router= express.Router();

router.get('/register', (req, res, next) =>{
    res.render('vwAccount/register');
})

router.post('/register', (req, res, next) =>{
    res.render('vwAccount/register');
})

module.exports = router;