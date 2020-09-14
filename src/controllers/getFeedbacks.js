const getFeedbacks = require('../queries/getFeedbacks');

module.exports = async (req, res) => {
	// get the notifications of the user
	const details = await getFeedbacks();

	return res.status(200).json({status: 'ok', message: 'success', data: details});
};
