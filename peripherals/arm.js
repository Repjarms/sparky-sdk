var raspi = require('raspi-io'),
	five  = require('johnny-five'),
	SoftPWM = require('raspi-soft-pwm').SoftPWM;	


var board = new five.Board({
	io: new raspi(),
	repl: false
});

const SERVO_PIN = 'P1-12';
const INTERVAL = 700;

board.on('ready', function() {

	var softPWM = new SoftPWM({pin: SERVO_PIN, range: 100, frequency: 200});
	var dutyCycle = 0;

	setInterval(function() {
		softPWM.write(dutyCycle);

		dutyCycle += 10;

		if (dutyCycle > 100) {
			dutyCycle = 0;
		}
	}, INTERVAL);
});
