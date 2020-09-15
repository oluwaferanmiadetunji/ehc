const User = require('../models/user');

module.exports = async (email, password) => {
	try {
		let user;
		user = await User.findOne({email});
		user.password = password;
		// save hospital to datbase
		await user.save();

		return Object.freeze({
			error: false,
			message: 'User successfully updated',
			data: user,
		});
	} catch (err) {
		console.log(err);
		return Object.freeze({
			error: true,
			message: 'User not saved',
		});
	}
};
