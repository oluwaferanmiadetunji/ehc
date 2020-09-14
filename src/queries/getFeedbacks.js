const Feedbacks = require('../models/feedback');

module.exports = async () => {
	try {
		const feedbacks = await Feedbacks.find();
		return feedbacks;
	} catch (err) {
		console.log(err);
		return null;
	}
};
