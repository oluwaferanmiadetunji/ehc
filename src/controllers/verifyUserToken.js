const User = require('../models/user');
const getDetails = require('../queries/getDetailsByEmail');
const {checkByEmail} = require('../queries/checkExistingUser');
const {hash} = require('../helpers/encrypt');
const updateUserPassword = require('../queries/updateUserPassword');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const token = req.body.token;
	const password = req.body.password.trim();

	if (email === '') {
		return res.status(417).json({status: 'error', message: 'Please, enter a valid email', data: ''});
	}
	if (token === '') {
		return res.status(417).json({status: 'error', message: 'Please, enter a verification token', data: ''});
	}
	if (password === '') {
		return res.status(417).json({status: 'error', message: 'Please, enter a password', data: ''});
	}
	if (password.length < 6) {
		return res.status(417).json({status: 'error', message: 'Password must be greater than 6 characters', data: ''});
	}

	// check if the email already exists
	const checkIfUserByEmail = await checkByEmail('User', email);

	if (!checkIfUserByEmail) {
		return res.status(409).json({status: 'error', message: 'Email does not exist', data: ''});
	}

	const getUser = await getDetails(User, email);

	console.log(getUser);

	if (getUser.token != token) {
		return res.status(404).json({status: 'error', message: 'Incorrect verification token', data: ''});
	} else {
		try {
			// hash the user's password
			const userPassword = hash(password, 10);

			const update = updateUserPassword(email, userPassword);

			if (update.error) {
				return res.status(500).json({status: 'error', message: 'Password changed successfully', data: ''});
			}
			return res.status(201).json({
				status: 'ok',
				message: update.message,
				data: '',
			});
		} catch (err) {
			return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
		}
	}
};
