const mongoose = require('mongoose');
const {databaseUrl} = require('./config');

mongoose.connect(databaseUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

module.exports = mongoose.connection;
