const mongoose = require('mongoose');
const Nurse = require('../models/nurse');

module.exports = async ({id, data}) => {
	try {
		let nurse;
		nurse = await Nurse.findOne({_id: id});
		if (nurse.name) nurse.name = data.name;
		if (nurse.email) nurse.email = data.email;
		if (nurse.imageURL) nurse.imageURL = data.imageURL;
		if (nurse.type) nurse.type = data.type;
		if (nurse.phone) nurse.phone = data.phone;
		if (nurse.hours) nurse.hours = data.hours;
		if (nurse.location) nurse.location = data.location;
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
