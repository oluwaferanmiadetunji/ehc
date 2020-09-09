module.exports = async ({User, email}) => {
	try {
		const user = await User.findOne({email});
		return user;
	} catch (err) {
		return err;
	}
};
