const mongoose = require('mongoose');
const Feedback = require('../models/feedback');

module.exports = async (sender, message) => {
	try {
		const newFeedback = new Feedback({
			_id: new mongoose.Types.ObjectId(),
			sender,
			message,
			readStatus: false,
		});

		// save feedback to datbase
    await newFeedback.save();
    
    return true;
    
	} catch (err) {
		return false;
	}
};
