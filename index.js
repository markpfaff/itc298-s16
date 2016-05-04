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

//create public folder for images,css etc
app.use(express.static('public'));

function getDate(){
    return Date();
}

//date partial
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.currentDate = getDate();
    next();
});

app.get('/', function(req, res) {
    res.type('html');

    var page_title = 'Showing All Artists: ';

    res.render('home', {title:'Home Page', page_title:page_title, artists: artist.showAllArtists(), artist_title:artist.showArtistTitle()});

});

//detail view
app.get('/detail/:artistName', function(req, res){
    var userArtist = req.params.artistName.toLowerCase();
    var userArtistResult = artist.searchArray(userArtist);
    var newDate = false;
    if (userArtistResult.date > '2015-01-01'){
        newDate = true;
    }
    res.render('detail', {page_title: userArtist, title:req.params.artistName, track: userArtistResult.track, date:userArtistResult.date, newDate:newDate});
});

//simple about page
app.get('/about', function(req, res) {
    res.render('about');
});

//add an item to the list
app.post('/search', function(req,res){
    res.type('html');
    var page_title = 'Searching for: ' + req.body.search_term;
    var user_search_term = req.body.search_term;


    if (artist.searchArray(user_search_term)){

        res.render('results', {title:'Search Results', page_title:page_title, results:'Success ' + user_search_term + ' has the track: ' + artist.searchArray(user_search_term).track} );

    } else {
        res.render('results', {title:'Search Results', page_title:page_title, results:'No artists match your search'} );

    }
    
});

//remove an item from the list
app.post('/remove', function(req,res){
    res.type('html');
    var page_title = 'Removing: ' + req.body.remove_term;
    var user_remove_term = req.body.remove_term;

    artist.removeTerm(user_remove_term);
    
    res.render('results', {title:'Remove Results', page_title:page_title, results:'Success ' + user_remove_term + ' has been removed! There are now ' + artist.showArrayLength() + ' artists total'});

});

//add an item to the list
app.post('/add', function(req,res){
    res.type('html');
    var page_title = 'Adding: ' + req.body.add_name + ' / ' + req.body.add_track + ' / ' + req.body.add_date;
    var user_add_artist = [{name: req.body.add_name, track: req.body.add_track, date: req.body.add_date}];

    artist.addArtist(user_add_artist);

    res.render('results', {title:'Add Results', page_title:page_title, results:'Success ' + req.body.add_name + ' has been added! There are ' + artist.showArrayLength() + ' artists total'});

});


//add an item to the list
app.post('/update', function(req,res){
    res.type('html');
    var page_title = 'Updating: ' + req.body.user_new_artist_name;
    var artist_name = req.body.user_new_artist_name;
    var user_new_artist = {name: req.body.user_new_artist_name, track: req.body.user_new_artist_track, date: req.body.user_new_artist_date };

    var found = artist.updateArtist( user_new_artist );

    if (found === true){

        res.render('results', {page_title:artist_name, results:'Success ' + artist_name + ' has been updated! There are ' + artist.showArrayLength() + ' artists total'});

    }else{
        res.render('results', {page_title:artist_name, results:'Unable to update artist'});
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


