const getNotifications = require('../queries/getNotifications');
// const getAdminNotifications = require('../queries/getAdminNotifications');

module.exports = async (req, res) => {
	// get the notifications of the user
	const details = await getNotifications(req.user.id);
	// const adminNotifications = await getAdminNotifications();
	// // filter the notifications
	// const data = details.concat(adminNotifications);

	return res.status(200).json({status: 'ok', message: 'success', data:details});
};
