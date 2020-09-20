const {storage, firebaseConfig} = require('../config/firebase');
// const convertToFile = require('./convertToFile');
// const deleteFile = require('./deleteFile');

module.exports = async (file) => {
	let status;
	// split file name to get extension
	const imageExtension = file.name.split('.')[file.name.split('.').length - 1];
	// Append extension to random numbers
	const imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;

	const filepath = path.join(os.tmpdir(), imageFileName);

	file.mv(filepath, (err) => {
		if (err) status = false;
	});

	await storage.upload(filepath, {
		resumable: false,
		metadata: {
			metadata: {
				contentType: file.mimetype,
			},
		},
	});
	fs.unlinkSync(filepath);
	status = true;

	const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;

	return {status, imageUrl};
};
