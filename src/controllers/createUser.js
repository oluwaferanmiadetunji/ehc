const User = require('../models/user');
const validateUserCredentials = require('../helpers/validateUserCredentials');
const {checkByEmail, checkByPhone} = require('../queries/checkExistingUser');
const saveUser = require('../helpers/saveUser');
const {hash} = require('../helpers/encrypt');
const {generate} = require('../helpers/jwtToken');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const name = req.body.name.trim();
	const password = req.body.password.trim();
	const gender = req.body.gender.trim();
	const phone = req.body.phone;

	const validateParams = validateUserCredentials({email, name, password, gender, phone});

	if (validateParams.error) {
		return res.status(417).json({status: 'error', message: validateParams.message, data: ''});
	}

	const checkIfUserByEmail = await checkByEmail({User, email});

	if (checkIfUserByEmail) {
		return res.status(409).json({status: 'error', message: 'Email exists already', data: ''});
	}

	const checkIfUserByPhone = await checkByPhone({User, phone});

	if (checkIfUserByPhone) {
		return res.status(409).json({status: 'error', message: 'Phone number exists already', data: ''});
	}

	try {
		// hash password
		const userPassword = hash(password, 10);
		const addUser = await saveUser({User, data: {email, name, password: userPassword, phone, gender, status: 'active'}});
		if (addUser.error) {
			return res.status(500).json({status: 'error', message: addUser.message, data: ''});
		} else {
			const payload = {name, email, id: addUser.data._id};
			const userToken = generate(payload);
			return res
				.status(201)
				.json({status: 'ok', message: addUser.message, data: {name, email, phone, gender, status: 'active', userToken}});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
	}
};
