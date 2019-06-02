var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts'
}));

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req,res) => {
    res.render('home');
})

app.get('/category/', (req,res) => {
    res.render('_layouts/template/kinhte/chung');
})

app.use('/admin/categories', require('./routes/admin/category.routes'));

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})































