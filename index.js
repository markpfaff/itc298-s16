var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var credentials = require('./credentials.js');

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

//date partial - partial MUST be above routes
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.currentDate = getDate();
    next();
});

//routes MUST be below partial
require('./routes.js')(app);






//database connection
var mongoose = require('mongoose');
mongoose.connect(credentials.getCredentials());
var Schema = mongoose.Schema;

// create db schema
var artistDBSchema = new Schema({
  name: { type: String, required: true },
  track: String,
  date: Date
});

//console.log(artistDBSchema);

//create model
var ArtistDB = mongoose.model('ArtistDB', artistDBSchema);

// make this available to app
module.exports = ArtistDB;

//module.exports = mongoose.model('Person', mySchema);



// create a new user
var newArtist = ArtistDB({
  name: 'beyonce',
  track: 'all_night',
  date: '2016-04-21'
});

// save the user
newArtist.save(function(err) {
  if (err) throw err;

  console.log('Artist created!');
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

