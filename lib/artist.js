var ArtistDB = require('../models/artistDB.js')

var artists = [     
    { name: 'kiiara', track: 'feels', date: '2016-12-12' },
    { name: 'tep_no', track: 'lana_del_dre', date: '2014-12-12' },
    { name: 'mtns', track: 'fears', date: '2014-12-12' },
    { name: 'white_sea', track: 'prague', date: '2014-12-12' },
];

// show all in list
// exports.showAllArtists =  function (artists){
//   	var results += "Name: " + artists.name + "  Track: " + artists.track + "  Date: " + artists.date + "  Awesome?: " + artists.awesome + "<br>";
// 	return results;
// }

// artists.forEach(showAllArtists);

//show length of array
exports.showArrayLength = function (){
	return artists.length;
}

//show length of array
exports.getArtists = function (){
	return artists;
}


var artistTitle = '';

exports.showAllArtists = function(){
    artistTitle = "There are " + artists.length + " artists";
    return artists;
};

exports.showArtistTitle = function(){
	return artistTitle;
}

exports.searchArray = function(user_search_term){

	var search_results = artists.find(function( obj ) {
	    return obj.name == user_search_term;
	});

	return search_results;

};

//remove data item
exports.removeTerm = function(user_remove_term){

	for(var i = artists.length - 1; i >= 0; i--) {
	    if(artists[i].name === user_remove_term) {
	       artists.splice(i, 1);
	    }
	}

}

//add artist
exports.addArtist = function(user_add_artist){
	var found = false;
	var success = false;

	artists.forEach(function(artist,index){
		
		if (artist.name === user_add_artist.name){
			found = true;
		}

	});

	if(found == false){
		artists.push(user_add_artist);
		success = true;
	}

	return success;
}

//update artist
exports.updateArtist = function(user_new_artist){
	var found = false;
	artists.forEach(function(artist,index){
		
		if (artist.name === user_new_artist.name){
			artists[index] = user_new_artist;
			found = true;
		}

	});

	if(found == false){
		return;
	}

	return found;
	
}
			


