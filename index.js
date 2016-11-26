require('dotenv').config();
var tone    	 = require('./lib/tone_analyzer'),
	vis	    	 = require('./lib/visual_recognition'),
	watson  	 = require('watson-developer-cloud'),
	mic	    	 = require('mic'),
	conversation = require('./lib/conversation'),
	tts 		 = require('./lib/tts'),
	fs 	    	 = require('fs'),
	math         = require('./plugins/math'),
	LED			 = require('./peripherals/led'),
	io			 = require('socket.io-emitter')({host: 'localhost', port: 6379});

/******
*
* Main wrapper function goes here
* need to have your module exports
*
*
*
*/

var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var attentionWord = config.attentionWord;
var visRecWord	= config.visRecWord;

// Set up STT service
var speech_to_text = watson.speech_to_text({
    username: process.env.STT_USERNAME,
    password: process.env.STT_PASSWORD,
    version: 'v1'
});

var mathOps = ['add', 'subtract', 'divide', 'multiply'];


/*************************
*
* MICROPHONE CONFIGURATION
* ************************
*
* 
*
*/

var micInstance = mic(
	{ 'rate': '44100', 
	  'channels': '2',
	  'debug': false,
	  'exitOnSilence': 6 });

// Instanstiate audio stream object
var micInputStream = micInstance.getAudioStream();

micInputStream.on('data', function(data) {
    //console.log("Recieved Input Stream: " + data.length);
});

micInputStream.on('error', function(err) {
    console.log("Error in Input Stream: " + err);
});

micInputStream.on('pause', function(err) {

});

micInputStream.on('silence', function() {
    // detect silence.
});

micInstance.start();

LED.init('white');

console.log('TJBot is listening');

var textStream = micInputStream.pipe(
	speech_to_text.createRecognizeStream({
		content_type: 'audio/l16; rate=44100; channels=2',
		keywords: [attentionWord],
		keywords_threshold: 0.5
}));

/*************************
*
* SET TEXT INPUT STREAM
* ************************
*
* 
*
*/

textStream.setEncoding('utf8');
textStream.on('data', function(str) {
	console.log(' ===== Speech to Text ==== : ' + str);


	if (stringContains(str, visRecWord)) {
		// need module for camera
		tts.speak("Ok, taking a picture");
		

		// then call vis rec with the file output from camera

	} else if (stringContains(str, attentionWord)) {

		let message = str.toLowerCase().replace(attentionWord.toLowerCase(), '');

		io.emit(message);
		
		// Send Res to conversation through conversation promise
		conversation.talkBack(message)
			.then(function(results) {
				console.log(results);

				let response = '';

				// TODO: get a better router for math and other plugins
				for (x in mathOps) {
					
					if (results.intents[0].intent == mathOps[x]) {
						
						// Pass number values in entities to math
						// plugin
						let answer = math.basic(
							results.intents[0].intent,
							results.entities[0].value,
							results.entities[1].value);

						response = results.output.text[0] + ' ' + String(answer);

						break;

					} else {
						response = results.output.text[0];
					}
				}

				// Speak the results from conversation
				tts.speak(response);
				io.emit(response);


			})
			.catch(function(reason) {
				console.log(reason);
		});

	}

});

function stringContains (str, keyword) {
	if (str.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
		return true;
	} else {
		return false;
	}
}
