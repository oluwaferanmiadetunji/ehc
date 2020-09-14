const Notifications = require('../models/notifications');
const mongoose = require('mongoose');

module.exports = async (user, sender, message, title) => {
	try {
		const newNotification = new Notifications({
			_id: new mongoose.Types.ObjectId(),
			userId: user,
			sender,
			message,
			title,
			readStatus: false,
		});

		// save notification to database
		await newNotification.save();

		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};
