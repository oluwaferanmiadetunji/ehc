const Hospitals = require('../models/hospital');

module.exports = async (location) => {
	try {
		const hospitals = await Hospitals.find({location});
		return hospitals;
	} catch (err) {
		console.log(err);
		return null;
	}
};
