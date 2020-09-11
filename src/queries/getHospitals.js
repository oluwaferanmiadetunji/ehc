const Hospitals = require('../models/hospital');

module.exports = async () => {
	try {
		const hospitals = await Hospitals.find();
		return hospitals;
	} catch (err) {
		console.log(err);
		return null;
	}
};
