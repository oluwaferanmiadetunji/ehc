const {v4: uuidv4} = require('uuid');
const fs = require('fs');

module.exports = (data) => {
	let error;
	const id = uuidv4();
	const imageName = `${id}.jpg`;
	const filePath = `${process.cwd()}/src/uploads/${imageName}`;
	let buff = new Buffer.from(data, 'base64');
	fs.writeFile(filePath, buff, (err) => {
		if (err) {
			console.log(err);
			error = true;
		} else {
			error = false;
		}
	});
	return {
		error,
		filePath,
		imageName,
	};
};
