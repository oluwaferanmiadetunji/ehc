const mongoose = require('mongoose');
const Nurse = require('../models/nurse');

module.exports = async ({data}) => {
	try {
		const newNurse = new Nurse({
			_id: new mongoose.Types.ObjectId(),
			name: data.name,
			email: data.email,
			password: data.password,
			phone: data.phone,
			type: data.type,
			location: data.location,
			hours: data.hours,
			imageURL: data.imageURL,
		});

		// save hospital to datbase
		await newNurse.save();

		return Object.freeze({
			error: false,
			message: 'User successfully saved',
			data: newNurse,
		});
	} catch (err) {
		console.log(err);
		return Object.freeze({
			error: true,
			message: 'Nurse not saved',
		});
	}
};
