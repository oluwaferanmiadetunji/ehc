const User = require('../models/user');
const Nurse = require('../models/nurse');
const checkByEmail = async (Model, email) => {
	switch (Model) {
		case 'User':
			const user = await User.findOne({email});
			return !!user ? true : false;
		case 'Nurse':
			const nurse = await Nurse.findOne({email});
			return !!nurse ? true : false;
		default:
			return null;
	}
};

const checkByPhone = async (Model, phone) => {
	switch (Model) {
		case 'User':
			const userP = await User.findOne({phone});
			return !!userP ? true : false;
		case 'Nurse':
			const nurseP = await Nurse.findOne({phone});
			return !!nurseP ? true : false;
		default:
			return null;
	}
};

module.exports = {
	checkByEmail,
	checkByPhone,
};
