module.exports = async (DB, email) => {
	try {
		const user = await DB.findOne({email});
		return user;
	} catch (err) {
		return err;
	}
};
