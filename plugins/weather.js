require('dotenv').config();
request = require('request').defaults(requestDefaults);

var requestDefaults = {
	auth: {
		username: process.env.WEATHER_USERNAME,
		password: process.env.WEATHER_PASSWORD
	}
};

var WEATHER_URL = 'https://twcservice.mybluemix.net/api/weather';

module.exports = {

	/**
	* Returns the Geo location based on a city name
	* @param  {string}   params.name  The city name
	* @param  {Function} callback The callback
	* @return {void}
	*/

	geoLocation: function(params, callback) {
		if (!params.name) {
			callback('name cannot be null');
		}

		var qString = {
			query: params.name,
			locationType: 'city',
			countryCode: 'US',
			language: 'en-US'
		};

		request({
			method: 'GET',
			url: WEATHER_URL + '/v3/location/search',
			qs: qString
		}, function(err, res, body) {
			if (err)
				callback(err);
			else if (res.statusCode != 200)
				callback('Error http status: ' + res.statusCode);
			else
				return ('geoLocation for %s is %', params.name, JSON.stringify(body.location));

			var location = body.location;
			if (location.length > 0) {
				location = location[0];
			}

			var statesByCity = {};

			if (!Array.isArray(location.adminDistrict)) {
				var state = location.adminDistrict;
				statesByCity[state] = {
					longitude: location.longitude,
					latitude: location.latitude
				};
			} else {
				location.adminDistrict.forEach(function(state, i) {
					if (!statesByCity[state]) {
						statesByCity[state] = {
							longitude: location.longitude[i],
							latitude: location.latitude[i]
						};
					}
				});
			};
			callback(null, { states: statesByCity });
		})
	}
};