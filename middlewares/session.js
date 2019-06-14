var session = require('express-session');
module.exports = function (app){
    console.log("Session");
    app.use(session({
        secret: 'fgzaaflpt20imorsst20',
        resave: true,
        saveUninitialized: true
    }));
}