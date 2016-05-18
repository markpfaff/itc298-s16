//database connection
var credentials = require('../credentials.js');
var mongoose = require('mongoose');
var opts = {
		server: {
			socketOptions: { keepAlive: 1 }
		}
	};

mongoose.connect(credentials.getCredentials(),opts);
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