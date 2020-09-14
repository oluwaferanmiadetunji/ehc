const Feedback = require('../models/feedback');

module.exports = async () => {
	try {
		await Feedback.deleteMany();
		return true;
	} catch (err) {
		return false;
	}
};
