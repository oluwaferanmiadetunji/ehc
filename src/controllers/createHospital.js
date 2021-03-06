const validateHospitalData = require('../helpers/validateHospitalData');
const saveHospital = require('../queries/saveHospital');

module.exports = async (req, res) => {
	const email = req.body.email.trim();
	const name = req.body.name.trim();
	const type = req.body.type.trim();
	const specialty = req.body.specialty.trim();
	const phone = req.body.phone;
	const location = req.body.location.trim().toLowerCase();

	// validate the user's data
	const validateParams = validateHospitalData({email, name, type, specialty, phone, location});

	if (validateParams.error) {
		return res.status(417).json({status: 'error', message: validateParams.message, data: ''});
	}

	try {
		// save the user to the database
		const addHospital = await saveHospital({data: {email, name, type, specialty, phone, location}});

		if (addHospital.error) {
			return res.status(500).json({status: 'error', message: addHospital.message, data: ''});
		}

		return res
			.status(201)
			.json({status: 'ok', message: addHospital.message, data: {email, name, type, specialty, phone, location}});
	} catch (err) {
		return res.status(500).json({status: 'error', message: 'Something went wrong!', data: ''});
	}
};
