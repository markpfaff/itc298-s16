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
	    res.type('html');
	    var page_title = 'Removing: ' + req.body.remove_term;
	    var user_remove_term = req.body.remove_term.toLowerCase();

	    ArtistDB.findOneAndRemove({name: user_remove_term} , function(err,artist){
	    	if(err) return console.log(err);
		    if (artist){

		        res.render('results', {title:'Search Results', page_title:page_title, results:'Success! ' + user_remove_term + ' has been removed.'} );

		    } else {
		        res.render('results', {title:'Search Results', page_title:page_title, results:'Couldn\'t find artist to remove'} );

		    }
	    });

	});

	//add an artist to the database
	app.post('/add', function(req,res){
	    res.type('html');
	    var page_title = 'Adding: ' + req.body.add_name + ' / ' + req.body.add_track + ' / ' + req.body.add_date;
	    var user_add_artist = [{name: req.body.add_name.toLowerCase(), track: req.body.add_track.toLowerCase(), date: req.body.add_date}];
	    var addArtistName = req.body.add_name.toLowerCase();
	    var addArtistTrack = req.body.add_track.toLowerCase();
		var addArtistDate = req.body.add_date;

		var found = false;

		ArtistDB.findOne({name: user_add_artist.name}, function(err, artist){
				if(err) return console.log(err);

				found = true;

		});

		if(found == false){

	        var addArtist = new ArtistDB({
	           name: addArtistName,
	           track: addArtistTrack,
	           date: addArtistDate
	        }).save(function(err){
            if(err) return console.log(err);
        	});

	        res.render('results', {title:'Add Results', page_title:page_title, results:'Success ' + req.body.add_name + ' has been added! There are ' + ArtistDB.length + ' artists total'});
		}else{
			res.render('results', {title:'Add Results', page_title:page_title, results:'Artist not added. Artist already exists.'});	    	

		}

	});


	//update an artist
	app.post('/update', function(req,res){
	    res.type('html');
	    var page_title = 'Updating: ' + req.body.user_new_artist_name;
	    var artist_name = req.body.user_new_artist_name.toLowerCase();
	    var user_new_artist = {name: req.body.user_new_artist_name.toLowerCase(), track: req.body.user_new_artist_track.toLowerCase(), date: req.body.user_new_artist_date };

	 ArtistDB.findOne(artist_name, function (err, artist) {
	      if (err) return console.log(err);
	      
		      artist.name= user_new_artist.name;
		      artist.track = user_new_artist.track;
		      artist.date = user_new_artist.date;
		      artist.save(function (err) {
		        if (err) return console.log(err);

		        res.render('results', {page_title:artist_name, results:'Success ' + artist_name + ' has been updated! There are ' + ArtistDB.length + ' artists total'});

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