var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: process.env.TONE_USERNAME,
  password: process.env.TONE_PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});

module.exports = {

	detectTone: function (text) {
		return new Promise(function(resolve, reject) {
			tone_analyzer.tone({text: text},
	  			function(err, tone) {
	    			if (err)
	      				reject(err);
	    			else {
	    				resolve(tone);
	    			}
			});
		});
	}

};

