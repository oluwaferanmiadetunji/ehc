const {isEmpty} = require('./helperFunctions');

module.exports = ({email, password}) => {
	let message = '';
	let error = false;
	if (isEmpty(email)) {
		message = 'Email can not be empty';
		error = true;
	} else if (isEmpty(password)) {
		message = 'Password can not be empty';
		error = true;
	}

	return Object.freeze({
		error,
		message,
	});
};
