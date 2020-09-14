const User = require('../models/user');

module.exports = async ({id, data}) => {
	try {
		let user;
		user = await User.findOne({_id: id});
		user.name = data.name;
		user.email = data.email;
		user.imageURL = data.imageURL;
		user.phone = data.phone;
		user.password = data.password;
		user.gender = data.gender;
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
