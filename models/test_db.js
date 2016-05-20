var ArtistDB = require('./artistDB.js')

//write new artists to database

new ArtistDB({
  name: 'beyonce2',
  track: 'all_night',
  date: '2016-04-21'
}).save();

new ArtistDB({
  name: 'santigold3',
  track: 'superman',
  date: '2011-04-21'
}).save();

new ArtistDB({
  name: 'indian_summer4',
  track: 'shiner',
  date: '2016-01-21'
}).save();

ArtistDB.find(function(err, artists){

		console.log(artists);
});
