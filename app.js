var express = require('express');
var path = require('path');
var morgan = require('morgan');
bodyParser = require('body-parser');
var Handlebars = require('handlebars');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname + '/views')));
// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(require('./middlewares/auth-locals.mdw'));
app.use(require('./middlewares/locals.mdw')); 
require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);

Handlebars.registerHelper('if_equal', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
})

app.get('/', (req,res) => {
    let parent_categories = [];
    let sub_categories = [];
    for (let i =0 ; i<res.locals.lcCategories.length; i++){
        if(!res.locals.lcCategories[i].parent_id){
            parent_categories.push(res.locals.lcCategories[i]);
        }
        else{
            sub_categories.push(res.locals.lcCategories[i]);
        }
    }
    res.render('home', {
        parent_categories: parent_categories,
        sub_categories: sub_categories
    });
})
app.use('/categories', require('./routes/category.routes'));
app.use('/admin/categories', require('./routes/admin/category.routes'));
app.use('/account', require('./routes/account.routes'));
app.use('/demo', require('./routes/demo.routes'));
app.use('/admin', require('./routes/admin/admin.routes'));
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































