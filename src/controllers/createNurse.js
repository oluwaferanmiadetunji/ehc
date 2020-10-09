const validateNurseData = require('../helpers/validateNurseData');
const {checkByEmail, checkByPhone} = require('../queries/checkExistingUser');
const saveNurse = require('../queries/saveNurse');
const {hash} = require('../helpers/encrypt');
const {generate} = require('../helpers/jwtToken');
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
	const validateParams = validateNurseData({email, name, password, type, phone, location});

	if (validateParams.error) {
		return res.status(417).json({status: 'error', message: validateParams.message, data: ''});
	}

	if (!file || !req.file || Object.keys(req.file).length === 0 || Object.keys(file).length === 0) {
		return res.status(409).json({status: 'error', message: 'Select a photo', data: ''});
	}
	if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
		return res.status(409).json({status: 'error', message: 'Invalid file type', data: ''});
	}

	// check if the email already exists
	const checkIfUserByEmail = await checkByEmail('Nurse', email);

	if (checkIfUserByEmail) {
		return res.status(409).json({status: 'error', message: 'Email exists already', data: ''});
	}

	// check if the phone already exists
	const checkIfUserByPhone = await checkByPhone('Nurse', phone);

	if (checkIfUserByPhone) {
		return res.status(409).json({status: 'error', message: 'Phone number exists already', data: ''});
	} else {
		try {
			// hash the user's password
			const userPassword = hash(password, 10);

			const save = await saveImage(file);

			if (save.error) {
				return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
			}

			// save the user to the database
			const addNurse = await saveNurse({
				data: {email, name, password: userPassword, phone, type, location, imageURL: save.imageUrl, hours},
			});

			if (addNurse.error) {
				return res.status(500).json({status: 'error', message: addNurse.message, data: ''});
			}

			const payload = {name, email, imageURL: save.imageUrl, id: addNurse.data._id};

			// generate the user's token
			const userToken = generate(payload);

			return res.status(201).json({
				status: 'ok',
				message: addNurse.message,
				data: {name, email, phone, type, location, type, imageURL: save.imageUrl, hours, userToken},
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
		}
	}
};
