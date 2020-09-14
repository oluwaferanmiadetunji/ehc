const {checkByEmail, checkByPhone} = require('../queries/checkExistingUser');
const updateNurse = require('../queries/updateNurse');
const saveImage = require('../helpers/saveImage');

module.exports = async (req, res) => {
	const id = req.body.id;
	let email, name, type, hours, phone, location, image;
	if (req.body.email) email = req.body.email.trim();
	if (req.body.name) name = req.body.name.trim();
	if (req.body.type) type = req.body.type.trim();
	if (req.body.hours) hours = req.body.hours.trim();
	if (req.body.phone) phone = req.body.phone;
	if (req.body.location) location = req.body.location.trim().toLowerCase();
	if (req.body.image) image = req.body.image;

	// check if the email already exists
	const checkIfUserByEmail = await checkByEmail('Nurse', email);

	if (checkIfUserByEmail) {
		return res.status(409).json({status: 'error', message: 'Email exists already', data: ''});
	} else {
		// check if the phone already exists
		const checkIfUserByPhone = await checkByPhone('Nurse', phone);

		if (checkIfUserByPhone) {
			return res.status(409).json({status: 'error', message: 'Phone number exists already', data: ''});
		} else {
			try {
				const {status, imageUrl} = await saveImage(image);

				if (!status) {
					return res.status(500).json({status: 'error', message: 'Something went wrong', data: ''});
				}

				// save the user to the database
				const addNurse = await updateNurse({
					id,
					data: {email, name, phone, type, location, imageURL: imageUrl, hours},
				});

				if (addNurse.error) {
					return res.status(500).json({status: 'error', message: addNurse.message, data: ''});
				}

				return res.status(201).json({
					status: 'ok',
					message: addNurse.message,
					data: {name, email, phone, type, location, type, imageURL: imageUrl, hours},
				});
			} catch (err) {
				console.log(err);
				return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
			}
		}
	}
};
