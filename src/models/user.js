const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const UserSchema = new Schema(
	{
		_id: mongoose.Types.ObjectId,
		name: {type: String, required: true},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {type: String},
		gender: {type: String},
		status: {type: String},
		phone: {type: String},
		imageURL: {type: String},
	},
	{
		timestamps: true,
	}
);

module.exports = Model('User', UserSchema);
