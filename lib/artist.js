var artists = [     
    { name: 'kiiara', track: 'feels' },
    { name: 'tep_no', track: 'lana_del_dre' },
    { name: 'mtns', track: 'fears' },
    { name: 'white_sea', track: 'prague' },
];

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

