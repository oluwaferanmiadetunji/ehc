const mongoose = require('mongoose');
const Hospital = require('../models/hospital');

module.exports = async ({data}) => {
	try {
		const newHospital = new Hospital({
			_id: new mongoose.Types.ObjectId(),
			name: data.name,
			email: data.email,
			phone: data.phone,
			type: data.type,
			location: data.location,
			specialty: data.specialty,
		});

		// save hospital to datbase
		await newHospital.save();

		return Object.freeze({
			error: false,
			message: 'Hospital successfully saved',
			data: newHospital,
		});
	} catch (err) {
		console.log(err);
		return Object.freeze({
			error: true,
			message: 'Hospital not saved',
		});
	}
};
