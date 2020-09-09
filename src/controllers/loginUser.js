const User = require('../models/user');
const validateLoginCredentials = require('../helpers/validateLoginCredentials');
const getUserByEmail = require('../queries/getUserByEmail');
const {validate} = require('../helpers/encrypt');
const {generate} = require('../helpers/jwtToken');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const password = req.body.password.trim();

	const validateParams = validateLoginCredentials({email, password});

	if (validateParams.error) {
		return res.status(417).json({status: 'error', message: validateParams.message, data: ''});
	} else {
		const getUser = await getUserByEmail({User, email});
		if (!getUser) {
			return res.status(409).json({status: 'error', message: 'Wrong credentials', data: ''});
		} else {
			try {
				// validate password
				const hashedPassword = getUser.password;
				const plainPassword = password;
				const passwordIsMatch = validate(plainPassword, hashedPassword);
				if (!passwordIsMatch) {
					return res.status(409).json({status: 'error', message: 'Wrong credentials', data: ''});
				} else {
					const payload = {id: getUser._id, name: getUser.name, email: getUser.email, phone: getUser.phone};
					const userToken = generate(payload);
					return res.status(201).json({
						status: 'ok',
						message: 'User logged in successfully',
						data: {
							_id: getUser._id,
							name: getUser.name,
							email: getUser.email,
							phone: getUser.phone,
							gender: getUser.gender,
							status: getUser.status,
							userToken,
						},
					});
				}
			} catch (err) {
				console.log(err);
				return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
			}
		}
	}
};
