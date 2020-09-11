const getNurse = require('../queries/getNurses');

module.exports = async (req, res) => {
	const location = req.body.location;
	// get the notifications of the user
	const details = await getNurse(location);

	return res.status(200).json({status: 'ok', message: 'success', data: details});
};
