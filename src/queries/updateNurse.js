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
		nurse.type = data.type;
		nurse.location = data.location;
		// save nurse to datbase
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
			message: 'Nurse not updated',
		});
	}
};
