require('dotenv').config();
var watson = require('watson-developer-cloud'),
	exec   = require('child_process').exec,
	fs	   = require('fs'),
	path   = require('path');

// Set up TTS service
var text_to_speech = watson.text_to_speech({
  username: process.env.TTS_USERNAME,
  password: process.env.TTS_PASSWORD,
  version: 'v1'
});

var config = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/../config.json'), 'utf8'));

module.exports = {

	speak: function(text) {

		var params = {
			text: text,
			voice: config.voice,
			accept: 'audio/wav'
		};

		var filepath = __dirname + '/resources/output.wav';

		var tempStream = text_to_speech.synthesize(params)
							.pipe(fs.createWriteStream(filepath))
							.on('close', function() {
								let create_audio = exec('aplay ' + filepath, function(error, stdout, stderr) {
									if (error != null) {
										console.log('exec error: ' + error);
									}
								});
		});


	}
};