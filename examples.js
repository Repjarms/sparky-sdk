require('dotenv').config();
var watson  	 = require('watson-developer-cloud'),
	tone    	 = require('./lib/tone_analyzer'),
	vis	    	 = require('./lib/visual_recognition'),
	conversation = require('./lib/conversation'),
	tts			 = require('./lib/tts'),
	camera		 = require('./peripherals/camera'),
	weather 	 = require('./plugins/weather'),
	math		 = require('./plugins/math'),
	io			 = require('socket.io-emitter')({host: 'localhost', port: 6379});


var statement = 'look at this i hate this so much';
var imageFile = __dirname + '/resources/horse.jpg';
var message = 'can you add two plus two';
var city	= 'Houston';
var redis_message = 'can you move your arm?';

// Tone Analyzer module
tone.detectTone(statement)
	.then(function(results) {
		console.log(JSON.stringify(results, null, 2));
	})
	.catch(function(reason) {
		console.log(reason);
	});

// Visual Recognition module
vis.detectImage(imageFile)
	.then(function(results) {
		console.log(results)
	})
	.catch(function(reason) {
		console.log(reason);
	});

// Conversation module
conversation.talkBack(message)
	.then(function(results) {
		console.log(results);
		console.log(math.basic(results.intents[0].intent, results.entities[0].value, results.entities[1].value));
	})
	.catch(function(reason) {
		console.log(JSON.stringify(reason, null, 2));
	});

// Conversation Redis example
io.emit('message', redis_message);
conversation.talkBack(redis_message)
	.then(function(results) {
		io.emit('message', results.output.text[0]);
	})
	.catch(function(reason){
		console.log(JSON.stringify(reason, null, 2));
	});





/*
weather.geoLocation(city, function(text) {
	console.log(text);
})
*/

/*
// Needs to be on board
//tts.speak(message);

// Camera peripheral
camera.capture()
		.then(function(image) {
			console.log(image);
		});

*/
