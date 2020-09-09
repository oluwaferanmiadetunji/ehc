const checkByEmail = async ({User, email}) => {
	try {
		const user = await User.findOne({email});
		return !!user ? true : false;
	} catch (err) {
		return err;
	}
};

const checkByPhone = async ({User, phone}) => {
	try {
		const user = await User.findOne({phone});
		return !!user ? true : false;
	} catch (err) {
		return err;
	}
};

module.exports = {
	checkByEmail,
	checkByPhone,
};
