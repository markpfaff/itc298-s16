var ArtistDB = require('./artistDB.js')

//write new artists to database

ArtistDB.find(function(err, artists){
	// if(err){
	// 	console.log(err);
	// }
	// if(artists.length) return;

		new ArtistDB({
		  name: 'beyonce',
		  track: 'all_night',
		  date: '2016-04-21'
		}).save();

		new ArtistDB({
		  name: 'santigold',
		  track: 'superman',
		  date: '2011-04-21'
		}).save();

		new ArtistDB({
		  name: 'indian_summer',
		  track: 'shiner',
		  date: '2016-01-21'
		}).save();

		console.log('New Artists created!');
});


//list artists in database to console
function listArtists(){
ArtistDB.find({ available: true }, function(err, artists){
	var context = {
		artists: artists.map(function(artist){
			return {
				name: artist.name,
				track: artist.track,
				date: artist.date,
			};
		})
	};
console.log(context);

});
}

// create a new user
// var newArtist = ArtistDB({
//   name: 'beyonce',
//   track: 'all_night',
//   date: '2016-04-21'
// });

// // save the user
// newArtist.save(function(err) {
//   if (err) throw err;

//   console.log('New Artists created!');
// });