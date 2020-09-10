module.exports = async (array, params, value) => {
	switch (params) {
		case 'readStatus':
			return array.filter(({readStatus}) => readStatus === value);
		default:
			return null;
	}
};
