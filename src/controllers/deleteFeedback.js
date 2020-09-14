const deleteFeedback = require('../queries/deleteFeedback');

module.exports = async (req, res) => {
	const deleteAllFeedbacks = await deleteFeedback();

	if (!deleteAllFeedbacks) {
		return res.status(500).json({status: 'error', message: 'Something went wrong', data: ''});
	}

	return res.status(201).json({status: 'ok', message: 'Feedbacks deleted', data: ''});
};
