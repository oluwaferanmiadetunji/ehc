const getHospitals = require('../queries/getHospitals');

module.exports = async (req, res) => {
	const location = req.body.location;
	// get the notifications of the user
	const details = await getHospitals(location);

	return res.status(200).json({status: 'ok', message: 'success', data: details});
};
