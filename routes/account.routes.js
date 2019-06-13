var express = require('express');
var bcrypt = require('bcrypt');
var moment = require ('moment');
var userModel = require('../models/user.model');
var passport = require('passport');

var router= express.Router();

router.get('/is_available', (req, res, next) =>{
    var user= req.query.username;
    userModel.singleByUserName(user)
    .then(rows => {
        if(rows.length > 0)
        {
            return res.json(false);
        }
        return res.json(true);
    })
})

router.get('/register', (req, res, next) =>{
    res.render('vwAccount/register');
})

router.post('/register', (req, res, next) =>{
    var saltRound=10;
    var hash = bcrypt.hashSync(req.body.password, saltRound);
    var dob = moment(req.body.date_of_birth, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var entity = {
        f_Name: req.body.name,
        f_Username: req.body.username,
        f_Email: req.body.email,
        f_Password: hash,
        f_Dob: dob,
        f_Permission: 1,
        f_isDel : false,
    };
    userModel.add(entity)
    .then(id => {
        res.redirect('/account/login');
    })
})

router.get('/login', (req, res, next) =>{
    res.render('vwAccount/login',{
        layout: false
    });
})

router.post('/login', (req, res, next) =>{
    passport.authenticate('local', (err, user, info) => {
        if (err)
          return next(err);
    
        if (!user) {
          return res.render('vwAccount/login', {
            layout: false,
            err_message: info.message
          })
        }
    
        req.logIn(user, err => {
          if (err)
            return next(err);
    
          return res.redirect('/');
        });
    })(req, res, next);
})

module.exports = router;