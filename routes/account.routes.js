var express = require('express');
var bcrypt = require('bcrypt');
var moment = require ('moment');
var userModel = require('../models/user.model');
var passport = require('passport');
var auth = require('../middlewares/auth')

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

router.post('/login',(req, res, next) =>{
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
          if (err){
            return next(err);
          }
          return res.redirect('/');
        });
    })(req, res, next);
})

router.get('/profile/:id', auth, (req, res, next) =>{
    id = req.params.id;
    userModel.single(id)
    .then((user) => {
        user[0].f_Dob = user[0].f_Dob.getDate() + "/" + (user[0].f_Dob.getMonth() +1) + "/" + user[0].f_Dob.getFullYear();
        res.render('vwAccount/profile',{
            userLogin: user[0],
        });
    }).catch(next);
})

router.get('/profile/:id', auth, (req, res, next) =>{
    id = req.params.id;
    userModel.single(id)
    .then((user) => {
        user[0].f_Dob = user[0].f_Dob.getDate() + "/" + (user[0].f_Dob.getMonth() +1) + "/" + user[0].f_Dob.getFullYear();
        res.render('vwAccount/profile',{
            userLogin: user[0],
        });
    }).catch(next);
})

router.post('/profile/:id', auth, (req, res, next) =>{
    id = req.params.id;
    var dob = moment(req.body.date_of_birth, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var entity = {
        f_Name: req.body.name,
        f_Email: req.body.email,
        f_Dob: dob,
    };
    userModel.update(entity, id)
    .then(() => {
        res.redirect('/');
    }).catch(next);
})

router.get('/change_password/:id', auth, (req, res, next) =>{
    id = req.params.id;
    userModel.single(id)
    .then((user) => {
        res.render('vwAccount/change_password',{
            userLogin: user[0],
        });
    }).catch(next);
})

router.get('/validate_password/:id&:old_password', auth, (req, res, next) =>{
    id = req.params.id;
    old_password = req.params.old_password;
    userModel.single(id)
    .then((user) => {
        var ret = bcrypt.compareSync(old_password, user[0].f_Password);
        if(ret){
            res.send({
                isValid:true,
            });
        }
        res.send({
            isValid:false,
        });
    }).catch(err => {
        console.log(err);
        res.end('error ocurred.');
    });
})

router.post('/change_password/:id', auth, (req, res, next) =>{
    id = req.params.id;
    var saltRound=10;
    var hash = bcrypt.hashSync(req.body.password, saltRound);
    userModel.single(id)
    .then(() => {
        var entity = {
            f_Password: hash,
        };
        userModel.update(entity, id)
        .then(() => {
            res.redirect('/');
        }).catch(next);
    }).catch(next);
})

router.post('/logout', auth, (req, res, next) => {
    req.logOut();
    res.redirect('/account/login');
})

module.exports = router;