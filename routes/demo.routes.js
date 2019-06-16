var express = require('express');

var router = express.Router();

router.get('/editor', (req, res, next) => {
    res.render('vwDemo/editor');
})

router.get('/upload', (req, res, next) => {
    res.render('vwDemo/upload');
})



module.exports = router;