var express = require('express');
var path = require('path');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'));
app.use(require('./middlewares/auth-locals.mdw'));
app.use(require('./middlewares/locals.mdw')); 
require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);


app.get('/', (req,res) => {
    res.render('home');
})
app.use('/categories', require('./routes/category.routes'));
app.use('/admin/categories', require('./routes/admin/category.routes'));
app.use('/account', require('./routes/account.routes'));
app.use((req, res, next) => {
    res.render('404', {layout:false});
})

app.use((error, req, res, next) => {
    res.render('error', {
        layout: false,
        message: error.message,
        error
    })
})

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})































