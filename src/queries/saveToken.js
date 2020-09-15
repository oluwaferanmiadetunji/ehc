const User = require('../models/user');
const Nurse = require('../models/nurse');

module.exports = async (DB, email, token) => {
	switch (DB) {
		case 'Nurse':
			let nurse;
			nurse = await Nurse.findOne({email});
			nurse.token = token;
			await nurse.save();
			return Object.freeze({
				error: false,
			});
		case 'User':
			try {
				let user;
				user = await User.findOne({email});
				user.token = token;
				await user.save();
				return Object.freeze({
					error: false,
				});
			} catch (err) {
				return Object.freeze({
					error: true,
				});
			}

		default:
			return Object.freeze({
				error: true,
			});
	}
};
