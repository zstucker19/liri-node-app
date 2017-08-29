var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

var question = function(searchType, data) {
	if(searchType == "my-tweets") {
		tweets();
	} else if(searchType == "spotify-this-song") {
		spotify();
	} else if(searchType == "movie-this") {
		movie();
	} else if(searchType == "do-what-it-says") {
		read();
	} else {
		console.log("Incorrect search type!");
	}
};


var tweets = function() {
	var accessTwitter = new twitter(keys.twitterKeys);

	accessTwitter.get("statuses/user_timeline", function(err, tweets, res) {
		if(!err) {
			for(var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at + " " + tweets[i].text)
			}
		} else {
			console.log(err);
		}
	});
};

var spotify = function(song) {
	if(song === undefined || song === null) {
		console.log("Sorry, don't have that song!");
	}

	spotify.search({
		type: "track",
		query: song
	}, function(err, data) {
		if(!err) {
			var songInfo = data.tracks.items;

			for(var i = 0; i <songInfo.length; i++) {
				console.log("Artist: " + songInfo[i].artists + "\nName: " + songInfo[i].name +
							"\nAlbum: " + songInfo[i].album.name);
			}
		} else {
			console.log(err) 
				return true;
		}
	});
};

var movie = function(someMovie) {
	if(someMovie === undefined || someMovie === null) {
		console.log("Sorry, don't have that movie!");
	}

	var movieCheck = "http://www.omdbapi.com/?t=" + someMovie + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

	request(movieCheck, function(err, res, body) {
		if(!err) {
			var movieInfo = JSON.parse(body);

			console.log("Title: " + movieInfo.Title + "\nYear: " + movieInfo.Year +
						"\nRated: " + movieInfo.Rated + "\nIMDB Rating: " + movieInfo.imdbRating +
						"\nCountry: " + movieInfo.Country + "\nLanguage: " + movieInfo.Language +
						"\nPlot: " + movieInfo.Plot + "\nActors: " + movieInfo.Actors +
						"\nRotten Tomatoes: " + movieInfo.tomatoURL);
		}
	});
};

var read = function() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if(!err) {
			console.log(data);
		} else {
			console.log(err);
		}
	});
};


var initialize = function(arg1, arg2) {
	question(arg1, arg2);
};

initialize(process.argv[2], process.argv[3]);