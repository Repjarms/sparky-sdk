var raspi = require('raspi-io'),
	five  = require('johnny-five');


/*********
* Pinout for LED
* GPIO 4  || PIN 7 (RED)
* GPIO 17 || PIN 11 (GREEN)
* GPIO 27 || PIN 13 (BLUE)
*********
*/

const RED = 'P1-7';
const GREEN = 'P1-11';
const BLUE = 'P1-13';


// Create new board object and set
// configuration to a Raspberry Pi
var board = new five.Board({
	io: new raspi(),
	repl: false
});


module.exports = {


	init: function(mode) {

		board.on('ready', function() {

			// Initialize LEDs
			var redLed = new five.Led(RED);
			var greenLed = new five.Led(GREEN);
			var blueLed	= new five.Led(BLUE);


			if (mode == 'white') {
				redLed.off();
				greenLed.off();
				blueLed.off();

			} else if (mode == 'white-blink') {

				redLed.stop();
				greenLed.stop();
				blueLed.stop();

				redLed.on();
				greenLed.on();
				blueLed.on();

				redLed.strobe();
				greenLed.strobe();
				blueLed.strobe();
			}

			this.on('exit', function() {

				redLed.stop();
				greenLed.stop();
				blueLed.stop();

				redLed.on();
				greenLed.on();
				blueLed.on();

			});
		});
	}

	/*
	off: function() {
		redLed.on();
		greenLed.on();
		blueLed.on();
	},
	stop: function() {
		redLed.stop();
		greenLed.stop();
		blueLed.stop();
	},
	white: function() {
		redLed.off();
		greenLed.off();
		blueLed.off();
	},
	red: function() {
		redLed.off();
		greenLed.on();
		blueLed.on();
	},
	green: function() {
		redLed.on();
		greenLed.off();
		blueLed.on();
	},
	blue: function() {
		redLed.on();
		greenLed.on();
		blueLed.off();
	},
	whiteBlink: function() {
		redLed.strobe();
		greenLed.strobe();
		blueLed.strobe();
	},
	redBlink: function() {
		redLed.strobe();
		greenLed.on();
		blueLed.on();
	},
	greenBlink: function() {
		redLed.on();
		greenLed.strobe();
		blueLed.on();
	},
	blueBlink: function() {
		redLed.on();
		greenLed.on();
		blueLed.strobe();
	}	
	*/	

};