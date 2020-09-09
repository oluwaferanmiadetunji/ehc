const bcrypt = require('bcrypt');

module.exports = {
	hash: (param, rounds) => {
		const salt = bcrypt.genSaltSync(rounds);
		const hash = bcrypt.hashSync(param, salt);
		return hash;
	},

	validate: (param, hashed) => {
		let result = bcrypt.compareSync(param, hashed);
		return result;
	},
};
