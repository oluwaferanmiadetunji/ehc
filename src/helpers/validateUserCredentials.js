const {isEmail, isEmpty, isGreater} = require('./helperFunctions');

module.exports = ({email, name, password, gender, phone}) => {
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
	} else if (isEmpty(password)) {
		message = 'Password can not be empty';
		error = true;
	} else if (!isGreater(password, 6)) {
		message = 'Password must be greater than 6 characters';
		error = true;
	} else if (isEmpty(gender)) {
		message = 'Gender can not be empty';
		error = true;
	} else if (isEmpty(phone))  {
		message = 'Phone number can not be empty';
		error = true;
	}

	return Object.freeze({
		error,
		message,
	});
};
