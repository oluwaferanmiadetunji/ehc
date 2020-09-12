const admin = require('firebase-admin');
const firebase = require('firebase');
const SA = require('./ServiceAccount.json');

const firebaseConfig = {
	apiKey: 'AIzaSyD1Tn8yDWqFfrk5bdUhO0becBAvpspQtwg',
	authDomain: 'kick-start-ba74b.firebaseapp.com',
	databaseURL: 'https://kick-start-ba74b.firebaseio.com',
	projectId: 'kick-start-ba74b',
	storageBucket: 'kick-start-ba74b.appspot.com',
	messagingSenderId: '664030078380',
	appId: '1:664030078380:web:008258fe31dd88d0c0c609',
	measurementId: 'G-4V7N6JN5FH',
};

admin.initializeApp({
	credential: admin.credential.cert(SA),
	storageBucket: firebaseConfig.storageBucket,
});

firebase.initializeApp(firebaseConfig);

const storage = admin.storage().bucket();

module.exports = {admin, firebase, storage, firebaseConfig};
