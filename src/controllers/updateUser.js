const validateUserCredentials = require('../helpers/validateUserCredentials');
const {checkByEmail, checkByPhone} = require('../queries/checkExistingUser');
const updateUser = require('../queries/updateUser');
const saveImage = require('../helpers/saveImage');
const {hash} = require('../helpers/encrypt');

module.exports = async (req, res) => {
	const id = req.body.id;
	const email = req.body.email.trim();
	const name = req.body.name.trim();
	const phone = req.body.phone;
	const image = req.body.image;
	const password = req.body.password;
	const gender = req.body.gender;

	const validateParams = validateUserCredentials({email, name, gender, password, phone, image});

	if (validateParams.error) {
		return res.status(417).json({status: 'error', message: validateParams.message, data: ''});
	}

	// check if the email already exists
	const checkIfUserByEmail = await checkByEmail('User', email);

	if (checkIfUserByEmail) {
		return res.status(409).json({status: 'error', message: 'Email exists already', data: ''});
	} else {
		// check if the phone already exists
		const checkIfUserByPhone = await checkByPhone('User', phone);

		if (checkIfUserByPhone) {
			return res.status(409).json({status: 'error', message: 'Phone number exists already', data: ''});
		} else {
			try {
				// hash the user's password
				const userPassword = hash(password, 10);

				const {status, imageUrl} = await saveImage(image);

				if (!status) {
					return res.status(500).json({status: 'error', message: 'Something went wrong', data: ''});
				}

				// save the user to the database
				const addUser = await updateUser({
					id,
					data: {email, name, password: userPassword, gender, phone, imageURL: imageUrl},
				});

				if (addUser.error) {
					return res.status(500).json({status: 'error', message: addUser.message, data: ''});
				}

				return res.status(200).json({
					status: 'ok',
					message: addUser.message,
					data: {name, email, phone, gender, imageURL: imageUrl},
				});
			} catch (err) {
				console.log(err);
				return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
			}
		}
	}
};
