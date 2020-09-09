const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');
module.exports = {
	generate: (payload) => {
		let token = jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + 60 * 60,
				payload,
			},
			secret
		);

		return token;
	},

	backdate: (payload) => {
		let token = jwt.sign(
			{
				payload,
				iat: Math.floor(Date.now() / 1000) - 30,
			},
			secret
		);

		return token;
	},

	verify: (token) => {
		try {
			var decoded = jwt.verify(token, secret);
			return decoded;
		} catch (err) {
			throw new Error(err);
		}
	},
};
