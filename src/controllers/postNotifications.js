const createNotification = require('../queries/createNotification');

module.exports = async (req, res) => {
	const message = req.body.message.trim();
	const title = req.body.title.trim();

	if (message === '') {
		return res.status(417).json({status: 'error', message: 'Message can not be empty', data: ''});
	}
	if (title === '') {
		return res.status(417).json({status: 'error', message: 'Title can not be empty', data: ''});
	}

	const create = await createNotification('all', 'admin', message, title);

	if (!create) {
		return res.status(500).json({status: 'error', message: 'Something went wrong', data: ''});
	}

	return res.status(201).json({status: 'ok', message: 'Notification sent', data: ''});
};
