const mongoose = require('mongoose');
const Nurse = require('../models/nurse');

module.exports = async ({id, data}) => {
	try {
		let nurse;
		nurse = await Nurse.findOne({_id: id});
		nurse.name = data.name;
		nurse.email = data.email;
		nurse.imageURL = data.imageURL;
		nurse.phone = data.phone;
		nurse.hours = data.hours;
		nurse.password = data.password;
		// save hospital to datbase
		await nurse.save();

		return Object.freeze({
			error: false,
			message: 'User successfully saved',
			data: nurse,
		});
	} catch (err) {
		console.log(err);
		return Object.freeze({
			error: true,
			message: 'Nurse not saved',
		});
	}
};
