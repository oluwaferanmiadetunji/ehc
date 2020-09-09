const mongoose = require('mongoose');
module.exports = async ({User, data}) => {
	try {
		const newUser = new User({
			_id: new mongoose.Types.ObjectId(),
			name: data.name,
			email: data.email,
			password: data.password,
			phone: data.phone,
			gender: data.gender,
			status: data.status,
		});
		await newUser.save();
		return Object.freeze({
			error: false,
			message: 'User successfully saved',
			data: newUser,
		});
	} catch (err) {
		return Object.freeze({
			error: true,
			message: 'User not saved',
		});
	}
};
