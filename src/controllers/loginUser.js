const User = require('../models/user');
const validateLoginCredentials = require('../helpers/validateLoginCredentials');
const getDetails = require('../queries/getDetailsByEmail');
const {validate} = require('../helpers/encrypt');
const {generate} = require('../helpers/jwtToken');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const password = req.body.password.trim();

	// validate the user's data
	const validateParams = validateLoginCredentials({email, password});

	if (validateParams.error) {
		return res.status(417).json({status: 'error', message: validateParams.message, data: ''});
	}

	// get the user's details
	const getUser = await getDetails(User, email);

	if (!getUser) {
		return res.status(409).json({status: 'error', message: 'Wrong credentials', data: ''});
	}

	try {
		const hashedPassword = getUser.password;
		const plainPassword = password;

		// validate the user's password
		const passwordIsMatch = validate(plainPassword, hashedPassword);
		if (!passwordIsMatch) {
			return res.status(409).json({status: 'error', message: 'Wrong credentials', data: ''});
		}

		// generate the user's token
		const payload = {
			id: getUser._id,
			name: getUser.name,
			email: getUser.email,
			phone: getUser.phone,
			imageURL: getUser.imageURL,
		};
		const userToken = generate(payload);

		return res.status(200).json({
			status: 'ok',
			message: 'User logged in successfully',
			data: {
				_id: getUser._id,
				name: getUser.name,
				email: getUser.email,
				phone: getUser.phone,
				gender: getUser.gender,
				imageURL: getUser.imageURL,
				userToken,
			},
		});
	} catch (err) {
		console.log(err)
		return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
	}
};
