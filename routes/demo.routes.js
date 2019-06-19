var express = require('express');

var router = express.Router();

router.get('/editor', (req, res, next) => {
    res.render('vwDemo/editor');
})

router.post('/editor', (req, res, next) => {
    var entity = {
        Title : req.body.Title,
        Avatar: req.body.Avatar,
        Summary: req.body.Summary,
        Content: req.body.Content,
        Cat: req.body.Cat
    }
    res.render('vwDemo/editor');
})

router.get('/upload', (req, res, next) => {
    res.render('vwDemo/upload');
})



module.exports = router;