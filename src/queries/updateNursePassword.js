const Nurse = require('../models/nurse');

module.exports = async (email, password) => {
	try {
		let nurse;
		nurse = await Nurse.findOne({email});
		nurse.password = password;
		// save hospital to datbase
		await nurse.save();

		return Object.freeze({
			error: false,
			message: 'Nurse successfully updated',
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
