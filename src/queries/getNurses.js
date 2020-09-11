const Nurse = require('../models/nurse');

module.exports = async (location) => {
	try {
		const nurse = await Nurse.find({location});
		return nurse;
	} catch (err) {
		console.log(err);
		return null;
	}
};
