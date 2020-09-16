const {checkByEmail} = require('../queries/checkExistingUser');
const {hash} = require('../helpers/encrypt');
const updateNursePassword = require('../queries/updateNursePassword');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const password = req.body.password.trim();

	if (email === '') {
		return res.status(417).json({status: 'error', message: 'Please, enter a valid email', data: ''});
	}
	if (password === '') {
		return res.status(417).json({status: 'error', message: 'Please, enter a password', data: ''});
	}
	if (password.length < 6) {
		return res.status(417).json({status: 'error', message: 'Password must be greater than 6 characters', data: ''});
	}

	// check if the email already exists
	const checkIfUserByEmail = await checkByEmail('Nurse', email);

	if (!checkIfUserByEmail) {
		return res.status(409).json({status: 'error', message: 'Email does not exist', data: ''});
	}

	try {
		// hash the user's password
		const userPassword = hash(password, 10);

		const update = updateNursePassword(email, userPassword);

		if (update.error) {
			return res.status(500).json({status: 'error', message: 'Password could not be changed', data: ''});
		}
		return res.status(201).json({
			status: 'ok',
			message: 'Password changed successfully',
			data: '',
		});
	} catch (err) {
		return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
	}
};
