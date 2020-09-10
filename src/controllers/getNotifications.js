const getNotifications = require('../queries/getNotifications');
const filterData = require('../helpers/filterData');

module.exports = async (req, res) => {
	const details = await getNotifications(req.user.id);
	const data = await filterData(details, 'readStatus', false);
	return res.status(200).json({status: 'ok', message: 'success', data});
};
