var watson = require('watson-developer-cloud'),
	fs	   = require('fs');

var visual_recognition = watson.visual_recognition({
  api_key: process.env.VIS_REC_KEY,
  version: 'v3',
  version_date: '2016-05-20'
});

module.exports = {

	detectImage: function (imageFilePath) {
		// Set params for API call
		let params = {
  			images_file: fs.createReadStream(imageFilePath)
		};

		return new Promise(function(resolve, reject) {
			visual_recognition.classify(params, function(err, res) {
			  if (err)
			    reject(err);
			  else
			    resolve(jsonMap(res));
			});
	    });

	}
};

function jsonMap (object) {

	// Reduce object to classes returned by first classifier
	let classes = object.images[0].classifiers[0].classes;

	// Add the depth key:value pair to each object in the array
	for (i in classes) {
		classes[i].depth = classes[i].type_hierarchy.match(new RegExp('/', 'g')).length || [].length;
	}

	// Find the highest depth value in the array
	let highest = Math.max.apply(Math, classes.map(function(o) {return o.depth}));

	// Push classes that match highest depth into new array
	let highArray = [];
	for (i in classes) {
		if (classes[i].depth == highest) {
			highArray.push(classes[i]);
		}
	}

	// If the new array has more than one class in it
	// then we find the class with the highest score (confidence)
	if (highArray.length > 1) {
		let highest = Math.max.apply(Math, highArray.map(function(o) {return o.score}));
		for (i in highArray) {
			if (highArray[i].score == highest) {
				return highArray[i];
			}
		}
	// Otherwise we return the only class in the array
	} else {
		return highArray[0];
	}
}