// var http = require('http');
// var fs = require('fs');
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


app.get('/', function(req, res) {
    res.render('home');
});
app.get('/about', function(req, res) {
    res.render('about');
});
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

var artists = [
    { id: 0, name: 'Kiiara', track: 'Feels' },
    { id: 1, name: 'Tep No', track: 'Lana Del Dre' },
    { id: 2, name: 'Mtns', track: 'Fears' },
    { id: 3, name: 'White Sea', track: 'Prague' },
];

app.get('/artists', function(req, res){
    res.json(artists);
    
});