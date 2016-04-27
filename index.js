var express = require('express');
var exphbs  = require('express-handlebars');
var artist = require('./lib/artist.js');


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

//add an item to the list
app.post('/search', function(req,res){
    res.type('html');
    var page_title = '<h1>Searching for: ' + req.body.search_term + '</h1>';
    var user_search_term = req.body.search_term;

    if (artist.searchArray(user_search_term)){

        res.send(page_title + 'Success! ' + user_search_term + ' has the track: ' + artist.searchArray(user_search_term).track);

    } else {
        
        res.send(page_title + 'No artists match your search');
    }
    
});

//remove an item from the list
app.post('/remove', function(req,res){
    res.type('html');
    var page_title = '<h1>Removing: ' + req.body.remove_term + '</h1>';
    var user_remove_term = req.body.remove_term;

    artist.removeTerm(user_remove_term);

    res.send(page_title + user_remove_term + ' has been removed! </br>' + artist.showArrayLength() + ' artists total');

});

//add an item to the list
app.post('/add', function(req,res){
    res.type('html');
    var page_title = '<h1>Adding: ' + req.body.add_name + ' / ' + req.body.add_track + ' / ' + req.body.add_date + '</h1>';
    var user_add_artist = [{name: req.body.add_name, track: req.body.add_track, date: req.body.add_date}];

    artist.addArtist(user_add_artist);

    res.send(page_title + req.body.add_name + ' has been added! </br>' + artist.showArrayLength() + ' artists total');

    //res.send(artist.showAllArtists(artists));

});


//add an item to the list
app.post('/update', function(req,res){
    res.type('html');
    var page_title = '<h1>Updating: ' + req.body.user_existing_artist_name + ' to ' + req.body.user_new_artist_name + '</h1>';

    var user_new_artist = [{name: req.body.user_new_artist_name, track: req.body.user_new_artist_track, date: req.body.user_new_artist_date }];

    artist.updateArtist( req.body.user_existing_artist_name, user_new_artist );


    if (artist.updateArtist() === 1){
        res.send(page_title + req.body.user_existing_artist_name + ' has been updated! </br>' + artist.showArrayLength() + ' artists total');
    }else{
        res.send('Unable to update artist');
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


