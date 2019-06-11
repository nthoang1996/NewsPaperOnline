var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var morgan = require('morgan');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    // helpers: {
    //     format: val => {
    //         return val + 'abc';
    //     }
    // }
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

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})































