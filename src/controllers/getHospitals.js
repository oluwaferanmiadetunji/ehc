const getHospitals = require('../queries/getHospitals');

module.exports = async (req, res) => {
	// get the notifications of the user
	const details = await getHospitals();

	return res.status(200).json({status: 'ok', message: 'success', data: details});
};
