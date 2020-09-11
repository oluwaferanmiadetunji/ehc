const getNurse = require('../queries/getNurses');

module.exports = async (req, res) => {
	// get the notifications of the user
	const details = await getNurse();

	return res.status(200).json({status: 'ok', message: 'success', data: details});
};
