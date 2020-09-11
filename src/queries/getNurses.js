const Nurse = require('../models/nurse');

module.exports = async () => {
	try {
		const nurse = await Nurse.find();
		return nurse;
	} catch (err) {
		console.log(err);
		return null;
	}
};
