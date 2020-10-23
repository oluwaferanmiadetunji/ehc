const validateUserCredentials = require('../helpers/validateUserCredentials');
const { checkByEmail, checkByPhone } = require('../queries/checkExistingUser');
const saveUser = require('../queries/saveUser');
const { hash } = require('../helpers/encrypt');
const { generate } = require('../helpers/jwtToken');
const saveImage = require('../queries/saveImage');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const name = req.body.name.trim();
	const password = req.body.password.trim();
	const gender = req.body.gender.trim().toLowerCase();
	const phone = req.body.phone;
	const file = req.file;

	console.log({ body: req.body, file: req.file });

	// validate the user's data
	// const validateParams = validateUserCredentials({ email, name, password, gender, phone });

	// if (validateParams.error) {
	// 	return res.status(417).json({ status: 'error', message: validateParams.message, data: '' });
	// }

	// if (!file || !req.file || Object.keys(req.file).length === 0 || Object.keys(file).length === 0) {
	// 	return res.status(409).json({ status: 'error', message: 'Select a photo', data: '' });
	// }
	// if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
	// 	return res.status(409).json({ status: 'error', message: 'Invalid file type', data: '' });
	// }

	// // check if the email already exists
	// const checkIfUserByEmail = await checkByEmail('User', email);

	// if (checkIfUserByEmail) {
	// 	return res.status(409).json({ status: 'error', message: 'Email exists already', data: '' });
	// }

	// // check if the phone already exists
	// const checkIfUserByPhone = await checkByPhone('User', phone);

	// if (checkIfUserByPhone) {
	// 	return res.status(409).json({ status: 'error', message: 'Phone number exists already', data: '' });
	// } else {
	// 	try {
	// 		// hash the user's password
	// 		const userPassword = hash(password, 10);
	// 		const save = await saveImage(file);
	// 		if (save.error) {
	// 			return res.status(500).json({ status: 'error', message: 'Something went wrong!', data: '' });
	// 		} else {
	// 			// save the user to the database
	// 			const addUser = await saveUser({
	// 				data: { email, name, password: userPassword, phone, imageURL: save.imageUrl, gender, status: 'active' },
	// 			});

	// 			if (addUser.error) {
	// 				return res.status(500).json({ status: 'error', message: addUser.message, data: '' });
	// 			}

	// 			const payload = { name, email, imageURL: save.imageUrl, id: addUser.data._id };

	// 			// generate the user's token
	// 			const userToken = generate(payload);

	// 			return res.status(201).json({
	// 				status: 'ok',
	// 				message: addUser.message,
	// 				data: { name, email, phone, gender, imageURL: save.imageUrl, status: 'active', userToken },
	// 			});
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 		return res.status(500).json({ status: 'error', message: 'Something went wrong!', data: '' });
	// 	}
	// }
};
