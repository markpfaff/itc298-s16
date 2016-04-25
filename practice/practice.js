var artists = [     
    { name: 'kiiara', track: 'feels', date: "2016-04-21" , copies: 13, awesome: true },
    { name: 'tep_no', track: 'lana_del_dre', date: "2016-04-23" , copies: 15, awesome: false  },
    { name: 'mtns', track: 'fears', date: "2016-04-11" , copies: 19, awesome: true  },
    { name: 'white_sea', track: 'prague', date: "2016-04-01" , copies: 20, awesome: false  },
];

//show all elements in array

function showAll(artists){
  	document.write("Name: " + artists.name + "  Track: " + artists.track + "  Date: " + artists.date + "  Awesome?: " + artists.awesome + "<br>");
}

artists.forEach(showAll);


//loop through specific key
for (i=0;i<artists.length;i++){

  print awesome column
	document.write("Name: " + artists[i].name + "<br>");
  
  console.log(artists[i]);
}

var artists = [     
    { name: 'kiiara', track: 'feels', date: "2016-04-21" , copies: 13, awesome: true },
    { name: 'tep_no', track: 'lana_del_dre', date: "2016-04-23" , copies: 15, awesome: false  },
    { name: 'mtns', track: 'fears', date: "2016-04-11" , copies: 19, awesome: true  },
    { name: 'white_sea', track: 'prague', date: "2016-04-01" , copies: 20, awesome: false  },
];

document.write("<br>Show all elements:<br><br>")

//show all elements
function showAll(artists){
  	document.write("Name: " + artists.name + "  Track: " + artists.track + "  Date: " + artists.date + "  Awesome?: " + artists.awesome + "<br>");
}
artists.forEach(showAll);

document.write("<br>Show specific Key:<br><br>")

//loop through specific key
for (i=0;i<artists.length;i++){

	document.write("Name: " + artists[i].name + "<br>");
  
}


var byDateAsc = function(artist1, artist2) {

 // sorts students by age in ascending order

 return artist1.date - artist2.date;

}

console.log(artists.sort(byDateAsc));

//return number of data items
document.write("<br>Show number of data items<br><br>")

document.write(artists.length);

for(var i = artists.length - 1; i >= 0; i--) {
    if(artists[i].name === "tep_no") {
       artists.splice(i, 1);
    }
}

document.write("<br>Remove a Value: <br><br>")
document.write(artists.length)