var raspi = require('raspi-io'),
	five  = require('johnny-five');

// Create new board object and set
// configuration to a Raspberry Pi
var board = new five.Board({
	io: new raspi()
});

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

board.on('ready', function() {

	// Red LED
	var redLed = new five.Led(RED);

	// Green LED
	var greenLed = new five.Led(GREEN);

	// Blue LED
	var blueLed	= new five.Led(BLUE);

	this.repl.inject({
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

	});


	this.on('exit', function() {
		redLed.on();
		greenLed.on();
		blueLed.on();
	});

});
