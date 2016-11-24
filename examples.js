require('dotenv').config();
var watson  	 = require('watson-developer-cloud'),
	tone    	 = require('./lib/tone_analyzer'),
	vis	    	 = require('./lib/visual_recognition'),
	conversation = require('./lib/conversation'),
	tts			 = require('./lib/tts'),
	camera		 = require('./peripherals/camera');


var statement = 'look at this i hate this so much';
var imageFile = __dirname + '/resources/horse.jpg';
var message = 'can you add two plus two';

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
	})
	.catch(function(reason) {
		console.log(reason);
	});

// Needs to be on board
//tts.speak(message);

// Camera peripheral
camera.capture()
		.then(function(image) {
			console.log(image);
		});
