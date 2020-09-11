const Notifications = require('../models/notifications');

module.exports = async () => {
	try {
		const notifications = await Notifications.find({sender: 'admin'});
		return notifications;
	} catch (err) {
		console.log(err);
		return [];
	}
};
