const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = async ({data}) => {
	try {
		const newUser = new User({
			_id: new mongoose.Types.ObjectId(),
			name: data.name,
			email: data.email,
			password: data.password,
			phone: data.phone,
			gender: data.gender,
			status: data.status,
			imageURL: data.imageURL,
		});

		// save user to datbase
		await newUser.save();

		return Object.freeze({
			error: false,
			message: 'User successfully saved',
			data: newUser,
		});
	} catch (err) {
		console.log(err);
		return Object.freeze({
			error: true,
			message: 'User not saved',
		});
	}
};
