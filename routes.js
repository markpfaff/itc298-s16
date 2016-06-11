module.exports = function(app){

	var artist = require('./lib/artist.js');
	var ArtistDB = require('./models/artistDB.js')


	//home page - show all artists
	app.get('/', function(req, res) {
	    res.type('html');
	    var page_title = 'Showing All Artists: ';
	    ArtistDB.find(function(err,artists){
	    	if(err) return console.log(err);
	    	res.render('home', {title:'Home Page', page_title:page_title, artists:artists});
	    });

	});

	//detail view
	app.get('/detail/:artistName', function(req, res){
	    var userArtist = req.params.artistName.toLowerCase();

	    ArtistDB.findOne({name:userArtist},function(err,artist){
	    	if(err) return console.log(err);
	    	var newDate = false;
		    if (artist.date > '2015-01-01'){
		        newDate = true;
		    }	    	
	    	res.render('detail', {artist:artist, newDate:newDate});
	    });

	});

	//simple about page
	app.get('/about', function(req, res) {
	    res.render('about');
	});

	//search for an artist in the database
	app.post('/search', function(req,res){
	    res.type('html');
	    var page_title = 'Searching for: ' + req.body.search_term;
	    var user_search_term = req.body.search_term.toLowerCase();


		ArtistDB.findOne({name:user_search_term},function(err,artist){
	    	if(err) return console.log(err);

		    if (artist){

		        res.render('results', {title:'Search Results', page_title:page_title, results:'Success ' + user_search_term + ' has the track: ' + artist.track} );

		    } else {
		        res.render('results', {title:'Search Results', page_title:page_title, results:'No artists match your search'} );

		    }
		});
	    
	});

	//remove an artist from the database
	app.post('/remove', function(req,res){

	    var user_remove_term = req.body.name.toLowerCase();
	    ArtistDB.findOneAndRemove({name: user_remove_term} , function(err,artist){
	    	if(err) return console.log(err);
		    if (artist){

		    res.json({"result":"Success! Artist has been removed"});

			} else {
			res.json({"result":"Woops! Artist doesn't exist!"});

	    	}
	    });

	});

	//add an artist to the database
	app.post('/add', function(req,res){
		console.log(req.body);
	    var addArtistName = req.body.name.toLowerCase();
	    var addArtistTrack = req.body.track.toLowerCase();
		var addArtistDate = req.body.date;

		var found = false;

		ArtistDB.findOne({name: artist.name}, function(err, artist){
				if(err) return console.log(err);

				found = true;

		});

		if(found == false){

	        var addArtist = new ArtistDB({
		           name: addArtistName,
		           track: addArtistTrack,
		           date: addArtistDate
		    }).save(function(err){
	            if(err) res.send(err);
        	});

        	res.json({"result":"Success! Artist has been added"});

		} else {
			res.json({"result":"Woops! Artist already exists!"});

		}

	});


	//update an artist
	app.post('/update', function(req,res){
	    var artist_name = req.body.name.toLowerCase();
	    var user_new_artist = {name: req.body.name.toLowerCase(), track: req.body.track.toLowerCase(), date: req.body.date };

		 ArtistDB.findOne(artist_name, function (err, artist) {
		      if (err) return console.log(err);

			      artist.name = user_new_artist.name;
			      artist.track = user_new_artist.track;
			      artist.date = user_new_artist.date;
			      artist.save(function (err) {
			        if (err) return console.log(err);

	        		res.json({"result":"Success! Artist has been updated"});

					});


		});
	});

	//api for all artist
	app.get('/api/artists', function(req, res){

	    ArtistDB.find(function(err,artists){
	    	if(err) return console.log(err);
		    	if(artists){
		    		res.json(artists);
		    	} else {
	        		res.status(500).send('Error occurred: server error.');
	    		}
	    	});

	});

	//api for artist detail
	app.get('/api/artists/:artist_name', function(req, res){

	    ArtistDB.findOne(req.params.artist_name, function (err, artist) {
	      if (err) return console.log(err);

	      if(artist){
	      	res.json(artist);
	      } else {
	        res.status(500).send('Error occurred: server error.');
	    	}
	  });
	});



};