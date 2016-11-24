var raspi = require('raspi-io'),
	five  = require('johnny-five');


var board = new five.Board({
	io: new raspi()
});

const SERVO_PIN = 'P1-32';

board.on('ready', function() {

	var servo = new five.Servo({
		pin: SERVO_PIN,
		center: true
	});
	servo.sweep();
});
