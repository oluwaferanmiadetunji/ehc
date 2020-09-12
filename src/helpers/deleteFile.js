const fs = require('fs');

module.exports = async (path) => {
	fs.unlink(path, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Successfully deleted the file.');
		}
	});
};
