const getNotifications = require('../queries/getNotifications');
const filterData = require('../helpers/filterData');

module.exports = async (req, res) => {
	// get the notifications of the user
	const details = await getNotifications(req.user.id);

	// filter the notifications
	const data = await filterData(details, 'readStatus', false);
	
	return res.status(200).json({status: 'ok', message: 'success', data});
};
