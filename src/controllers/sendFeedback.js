const saveFeedback = require('../queries/saveFeedback');
const validateFeedback = require('../helpers/validateFeedback');

module.exports = async (req, res) => {
	const sender = req.body.sender.trim();
	const message = req.body.message.trim();

	// validate the feedback
	const validateParams = await validateFeedback({sender, message});

	if (validateParams.error) {
		return res.status(417).json({status: 'error', errorMessage: validateParams.message, data: ''});
	}

	// save feedback
	const save = await saveFeedback(sender, message);

	if (!save) {
		return res.status(400).json({status: 'error', message: 'Something went wrong', data: ''});
	}

	return res.status(200).json({status: 'ok', message: 'Feedback sent', data: ''});
};
