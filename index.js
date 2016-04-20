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


var artists = [     
    { name: 'kiiara', track: 'feels' },
    { name: 'tep_no', track: 'lana_del_dre' },
    { name: 'mtns', track: 'fears' },
    { name: 'white_sea', track: 'prague' },
];


app.post('/search', function(req,res){
    res.type('html');
    var page_title = '<h1>Searching for: ' + req.body.search_term + '</h1>';
    
    var search_results = artists.find(function( obj ) {
        return obj.name == req.body.search_term;
    });
    if (search_results){

        res.send(page_title + 'Track: ' + search_results.track);

    } else {
        
        res.send(page_title + 'No artists match your search');
    }
    
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


