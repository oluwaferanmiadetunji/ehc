const {storage, firebaseConfig} = require('../config/firebase');
const convertToFile = require('./convertToFile');
const deleteFile = require('./deleteFile');

module.exports = async (data) => {
	let status;
	let imageUrl;
	const {error, filePath, imageName} = convertToFile(data);
	if (error) {
		status = false;
		imageUrl = '';
	} else {
		await storage.upload(filePath, {
			resumable: false,
			metadata: {
				metadata: {
					contentType: 'image/jpg',
				},
			},
		});
		status = true;
		imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageName}?alt=media`;
		await deleteFile(filePath);
	}
	return {status, imageUrl};
};
