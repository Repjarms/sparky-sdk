const add = 'add';
const subtract = 'subtract';
const divide = 'divide';
const multiply = 'multiply';

module.exports = {


	/**
	* Returns the result of two numbers for basic math operations
	* @param  {string}   op The name of the math operation
	* @param  {string}	 num1 The first number
	* @param  {string}	 num2 the second number
	* @return {int}	 	 The result of the two numbers by operation
	*/

	basic: function(op, num1, num2) {

		num1 = parseInt(num1);
		num2 = parseInt(num2);

		if (op == add) {
			return num1 + num2;

		} else if (op == subtract) {
			return num1 - num2;

		} else if (op == divide) {
			return num1 / num2;

		} else if (op == multiply) {
			return num1 * num2;
			
		} else {
			return "This is not a valid operation";
		}
	}
};

