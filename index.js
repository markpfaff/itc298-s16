var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'), function(){
    console.log('the server is running', app.get('port'))
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());//support json enconded bodies
app.use(bodyParser.urlencoded({ extended: true})); //support encoded bodies

//create public folder for images,css etc
app.use(express.static('public'));

//use cors for api
app.use('/api', require('cors')());

function getDate(){
    return Date();
}

//date partial
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.currentDate = getDate();
    next();
});

require('./routes.js')(app);

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

