var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var  userModel = require('../models/user.model');
var bcrypt = require('bcrypt');
module.exports = function (app){
    app.use(passport.initialize());
    app.use(passport.session());
    var ls = new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },(username, password, done) => {
        userModel.singleByUserName(username)
        .then(rows => {
            if(rows.length == 0){
                return done(null, false, {message: 'Tài khoản chưa được đăng ký.'});
            }

            var user = rows[0];
            var ret = bcrypt.compareSync(password, rows[0].f_Password);
            if(ret)
            {
                return done(null, user);
            }
            return done(null, false, {message: 'Mật khẩu không đúng.'});
        }).catch(err => {
            return done(err, false);
        })
        console.log("passport")
    });

    passport.use(ls);
    passport.serializeUser((user, done) => {
        console.log("serializeUser");
        return done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log("deserializeUser");
        return done(null, user);
    });
}