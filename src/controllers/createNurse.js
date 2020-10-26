const validateNurseData = require('../helpers/validateNurseData');
const { checkByEmail, checkByPhone } = require('../queries/checkExistingUser');
const saveNurse = require('../queries/saveNurse');
const { hash } = require('../helpers/encrypt');
const saveImage = require('../queries/saveImage');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const name = req.body.name.trim();
	const password = req.body.password.trim();
	const type = req.body.type.trim();
	const hours = req.body.hours.trim();
	const phone = req.body.phone;
	const location = req.body.location.trim().toLowerCase();
	const file = req.file;

	// validate the user's data
	const validateParams = validateNurseData({ email, name, password, type, phone, location });

	if (validateParams.error) {
		return res.render('nurse', {
			error: true,
			success: false,
			message: 'Select a photo',
			data: { email, name, password, type, phone, location },
		});
	}

	if (!file || !req.file || Object.keys(req.file).length === 0 || Object.keys(file).length === 0) {
		return res.render('nurse', {
			error: true,
			success: false,
			message: 'Invalid file type',
			data: { email, name, password, type, phone, location },
		});
	}
	if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
		return res.status(409).json({ status: 'error', message: 'Invalid file type', data: '' });
	}

	// check if the email already exists
	const checkIfUserByEmail = await checkByEmail('Nurse', email);

	if (checkIfUserByEmail) {
		return res.render('nurse', {
			error: true,
			success: false,
			message: 'Email exists already',
			data: { email, name, password, type, phone, location },
		});
	}

	// check if the phone already exists
	const checkIfUserByPhone = await checkByPhone('Nurse', phone);

	if (checkIfUserByPhone) {
		return res.render('nurse', {
			error: true,
			success: false,
			message: 'Phone number exists already',
			data: { email, name, password, type, phone, location },
		});
	} else {
		try {
			// hash the user's password
			const userPassword = hash(password, 10);

			const save = await saveImage(file);

			if (save.error) {
				return res.render('nurse', {
					error: true,
					success: false,
					message: 'Something went wrong!',
					data: { email, name, password, type, phone, location },
				});
			}

			// save the user to the database
			const addNurse = await saveNurse({
				data: { email, name, password: userPassword, phone, type, location, imageURL: save.imageUrl, hours },
			});

			if (addNurse.error) {
				return res.render('nurse', {
					error: true,
					success: false,
					message: addUser.message,
					data: { email, name, password, type, phone, location },
				});
			}

			return res.render('nurse', {
				error: false,
				message: addNurse.message,
				success: true,
				data: { email: '', name: '', password: '', type: '', phone: '', location: '', hours: '' },
			});
		} catch (err) {
			return res.render('nurse', {
				error: true,
				success: false,
				message: 'Something went wrong!',
				data: { email, name, password, type, phone, location },
			});
		}
	}
};
