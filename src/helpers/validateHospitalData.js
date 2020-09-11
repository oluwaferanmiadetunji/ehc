const {isEmail, isEmpty} = require('./helperFunctions');

module.exports = ({email, name, type, specialty, phone, address}) => {
	let message = '';
	let error = false;
	if (isEmpty(name)) {
		message = 'Name can not be empty';
		error = true;
	} else if (isEmpty(email)) {
		message = 'Email can not be empty';
		error = true;
	} else if (!isEmail(email)) {
		message = 'Invalid email address';
		error = true;
	} else if (isEmpty(specialty)) {
		message = 'Specialty can not be empty';
		error = true;
	} else if (isEmpty(type)) {
		message = 'Type can not be empty';
		error = true;
	} else if (isEmpty(phone)) {
		message = 'Phone number can not be empty';
		error = true;
	} else if (isEmpty(address)) {
		message = 'Address can not be empty';
		error = true;
	}

	return Object.freeze({
		error,
		message,
	});
};
