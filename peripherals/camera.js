var RaspiCam = require('raspicam'),
	fs		 = require('fs');


var camera = new RaspiCam({
	mode: 'photo',
	output: './photos/image.jpg',
	encoding: 'jpg',
	timeout: 1 // seconds to delay
});

var image = 'ASDF';

// Start event is triggered when camera.start() is called
camera.on('start', function(err, timestamp) {
	console.log('Starting photo capture at' + timestamp);
});

// Read event is triggered when a new photo or video is saved
camera.on('read', function(err, timestamp, filename) {

	// Exclude temporary files

	if (filename.indexOf('~') == -1) {
		console.log('Photo captured at ' + timestamp);
		image = __dirname + '/photos/' + filename;
		camera.stop();
	}

});

camera.on('stop', function(err, timestamp) {

});


camera.on('exit', function(timestamp) {
	console.log('Process exited at ' + timestamp);
});

module.exports = {

	capture: function() {

	}
};