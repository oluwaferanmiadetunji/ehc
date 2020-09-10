const Notifications = require('../models/notifications');
const mongoose = require('mongoose');

module.exports = async (user, sender, message) => {
	try {
		const newNotification = new Notifications({
			_id: new mongoose.Types.ObjectId(),
			userId: user,
			sender,
			message,
			readStatus: false,
		});
		await newNotification.save();
		return true;
	} catch (err) {
		return false;
	}
};
