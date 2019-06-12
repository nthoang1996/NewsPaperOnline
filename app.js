var express = require('express');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var path = require('path');
var morgan = require('morgan');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
        // format: val => {
        //     return val + 'abc';
        // },
        section: hbs_sections(),
    }
}));

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'));
app.use(require('./middlewares/locals.mdw')); 


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































