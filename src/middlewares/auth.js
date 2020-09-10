const {verify} = require('../helpers/jwtToken');

module.exports = async (req, res, next) => {
	let idToken;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else {
		return res.status(403).json({status: 'error', message: 'Unauthorized request', data: ''});
	}

	if (verify(idToken)) {
		const payload = await verify(idToken).payload;
		req.user = payload;
		return next();
	} else {
		return res.status(403).json({status: 'error', message: 'Unauthorized request', data: ''});
	}
};
