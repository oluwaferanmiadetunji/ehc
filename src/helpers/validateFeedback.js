const {isEmpty} = require('./helperFunctions');

module.exports = ({sender, message}) => {
	let errorMessage = '';
	let error = false;
	if (isEmpty(sender)) {
		errorMessage = 'Sender can not be empty';
		error = true;
	} else if (isEmpty(message)) {
		errorMessage = 'Message can not be empty';
		error = true;
	}

	return Object.freeze({
		error,
		errorMessage,
	});
};
