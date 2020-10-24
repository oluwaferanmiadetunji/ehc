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

	// validate the user's data
	const validateParams = validateUserCredentials({ email, name, password, gender, phone });

	if (validateParams.error) {
		return res.render('index', {
			error: true,
			success: false,
			message: validateParams.message,
			data: { email, name, password, phone },
		});
	}

	if (!file || !req.file || Object.keys(req.file).length === 0 || Object.keys(file).length === 0) {
		return res.render('index', {
			error: true,
			success: false,
			message: 'Select a photo',
			data: { email, name, password, phone },
		});
	}
	if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
		return res.render('index', {
			error: true,
			success: false,
			message: 'Invalid file type',
			data: { email, name, password, phone },
		});
	}

	// check if the email already exists
	const checkIfUserByEmail = await checkByEmail('User', email);

	if (checkIfUserByEmail) {
		return res.render('index', {
			error: true,
			success: false,
			message: 'Email exists already',
			data: { email, name, password, phone },
		});
	}

	// check if the phone already exists
	const checkIfUserByPhone = await checkByPhone('User', phone);

	if (checkIfUserByPhone) {
		return res.render('index', {
			error: true,
			success: false,
			message: 'Phone number exists already',
			data: { email, name, password, phone },
		});
	} else {
		try {
			// hash the user's password
			const userPassword = hash(password, 10);
			const save = await saveImage(file);
			if (save.error) {
				return res.render('index', {
					error: true,
					success: false,
					message: 'Something went wrong!',
					data: { email, name, password, phone },
				});
			} else {
				// save the user to the database
				const addUser = await saveUser({
					data: { email, name, password: userPassword, phone, imageURL: save.imageUrl, gender, status: 'active' },
				});

				if (addUser.error) {
					return res.render('index', {
						error: true,
						success: false,
						message: addUser.message,
						data: { email, name, password, phone },
					});
				}

				const payload = { name, email, imageURL: save.imageUrl, id: addUser.data._id };

				// generate the user's token
				const userToken = generate(payload);

				return res.render('index', {
					error: false,
					message: addUser.message,
					success: true,
					data: { email: '', name: '', password: '', phone: '' },
				});
			}
		} catch (err) {
			console.log(err);
			return res.render('index', {
				error: true,
				success: false,
				message: 'Something went wrong!',
				data: { email, name, password, phone },
			});
		}
	}
};
