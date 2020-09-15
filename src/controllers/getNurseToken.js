const Nurse = require('../models/nurse');
const getDetails = require('../queries/getDetailsByEmail');
const sendEmail = require('../helpers/sendEmail');
const saveToken = require('../queries/saveToken');

module.exports = async (req, res) => {
	const email = req.body.email.trim();

	if (email === '') {
		return res.status(417).json({status: 'error', message: 'Please, enter a valid email', data: ''});
	}

	const getNurse = await getDetails(Nurse, email);

	if (!getNurse) {
		return res.status(409).json({status: 'error', message: 'Email does not exist', data: ''});
	}
	const token = Math.floor(Math.pow(10, 5) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 5) - 1));

	const saveT = await saveToken('Nurse', email, token);

	if (saveT.error) {
		return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
	}

	await sendEmail(email, token);

	return res.status(200).json({status: 'ok', message: 'A verification token to has been sent to your email address', data: ''});
};
