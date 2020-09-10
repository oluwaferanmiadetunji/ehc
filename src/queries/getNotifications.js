const Notifications = require('../models/notifications');

module.exports = async (userId) => {
	try {
		const notifications = await Notifications.find({userId});
		return notifications;
	} catch (err) {
		console.log(err);
		return null;
	}
};
