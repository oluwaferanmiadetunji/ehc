const fs = require('fs');
const {firebaseConfig, storage} = require('../config/firebase');

module.exports = async (file) => {
	const imageExtension = file.originalname.split('.')[file.originalname.split('.').length - 1];
	// Append extension to random numbers
	const imageFileName = `${Math.round(Math.random() * 1000000000000).toString()}.${imageExtension}`;

	let error = false;
	let imageUrl;
	try {
		await storage.upload(file.path, {
			resumable: false,
			metadata: {
				metadata: {
					contentType: file.mimetype,
				},
			},
		});
		fs.unlinkSync(file.path);
		error = false;
		imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
	} catch (err) {
		console.log(err);
		error = true;
		imageUrl = '';
	}

	return {
		error,
		imageUrl,
	};
};
